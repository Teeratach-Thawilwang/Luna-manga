import { shallowEqual } from "react-redux";

import { ImageResponsiveEnum } from "@enums/ImageResponsiveEnum";
import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import { MangaEditorElement, TextEditorElement } from "@interfaces/EditorInterface";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { AudioInterface } from "@interfaces/frontside/AudioInterface";
import {
  ChapterInterface,
  ChapterListInterface,
  ChapterReactionParams,
  ChapterShowParams,
  ChapterSliceInterface,
} from "@interfaces/frontside/ChapterInterface";
import { ImageInterface } from "@interfaces/frontside/ImageInterface";
import ChapterApi from "@repositories/frontside/ChapterApi";
import AuthService from "@services/frontside/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update, updateReaction } from "@store/slices/frontside/ChapterSlice";
import { navigateTo } from "@utils/Helpers";

class ChapterService {
  public clearState() {
    store.dispatch(update({ data: null, is_accept_audio: false, audio_current: 0, is_loading: false, error: "" }));
  }

  public getState(): ChapterSliceInterface {
    return useAppSelector((state) => state.frontside.chapter, shallowEqual);
  }

  public getChapter(): ChapterInterface | null {
    return useAppSelector((state) => state.frontside.chapter.data, shallowEqual);
  }

  public getChapterId(): number | null {
    return useAppSelector((state) => state.frontside.chapter.data?.id ?? null, shallowEqual);
  }

  public getIsAcceptAudio(): boolean {
    return useAppSelector((state) => state.frontside.chapter.is_accept_audio, shallowEqual);
  }

  public getAudioCurrentNumber(): number {
    return useAppSelector((state) => state.frontside.chapter.audio_current, shallowEqual);
  }

  public getChapterList(): ChapterListInterface[] {
    return useAppSelector((state) => state.frontside.chapter.data?.chapter_list ?? [], shallowEqual);
  }

  public getStoryName(): string | null {
    return useAppSelector((state) => state.frontside.chapter.data?.story_name ?? null, shallowEqual);
  }

  public getChapterType(): CategoryTypeEnum | null {
    return useAppSelector((state) => state.frontside.chapter.data?.type ?? null, shallowEqual);
  }

  public getChapterIsLoaded(): boolean {
    return useAppSelector((state) => state.frontside.chapter.data != null, shallowEqual);
  }

  public getChapterIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.chapter.is_loading, shallowEqual);
  }

  public getChapterError(): string {
    return useAppSelector((state) => state.frontside.chapter.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadShow(slug: string, chapterNumber: number): void {
    store.dispatch(update({ is_loading: true }));

    const params: ChapterShowParams = {
      slug: slug,
      chapter_number: chapterNumber,
    };

    ChapterApi.show(params)
      .then((response) => {
        store.dispatch(update({ data: response, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadShow(slug, chapterNumber);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public reaction(customerId: number, chapterId: number, like?: number, dislike?: number): void {
    const params: ChapterReactionParams = {
      customer_id: customerId,
      chapter_id: chapterId,
    };

    if (like != undefined) {
      params["like"] = like;
    }

    if (dislike != undefined) {
      params["dislike"] = dislike;
    }

    ChapterApi.reaction(params)
      .then((response) => {
        store.dispatch(updateReaction({ reaction: { ...response } }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.reaction(customerId, chapterId, like, dislike);
            });
            break;
          default:
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public transformTextToEditor(
    text: string,
    images: ImageInterface[],
    audio: AudioInterface[],
    screen: ImageResponsiveEnum = ImageResponsiveEnum.DESKTOP,
  ): TextEditorElement[] | MangaEditorElement[] {
    const rawNodes = JSON.parse(text);
    const mapNodes = rawNodes.map((node: TextEditorElement | MangaEditorElement) => {
      if (node.type == ElementTypeEnum.IMAGE) {
        const filteredImage = images.filter((item) => item.id == node.file_id);
        node.url = filteredImage.length > 0 ? filteredImage[0][screen] : "";
      }
      if (node.type == ElementTypeEnum.AUDIO) {
        const filteredAudio = audio.filter((item) => item.id == node.file_id);
        node.url = filteredAudio.length > 0 ? filteredAudio[0]?.url : "";
      }
      return node;
    });

    return mapNodes;
  }
}

export default new ChapterService();
