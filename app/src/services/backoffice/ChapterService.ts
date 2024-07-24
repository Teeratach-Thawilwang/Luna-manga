import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ImageResponsiveEnum } from "@enums/ImageResponsiveEnum";
import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { MangaEditorElement, TextEditorElement } from "@interfaces/EditorInterface";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { AudioInterface } from "@interfaces/backoffice/AudioInterface";
import { ChapterInterface, ChapterSliceInterface, GetChapterParams, GetChapterResponse } from "@interfaces/backoffice/ChapterInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import ChapterApi from "@repositories/backoffice/ChapterApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/ChapterSlice";

class ChapterService {
  public clearState() {
    store.dispatch(update({ data: null, is_loading: false, error: "" }));
  }

  public getState(): ChapterSliceInterface {
    return useAppSelector((state) => state.backoffice.chapter, shallowEqual);
  }

  public getterChapter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.chapter.data![key], shallowEqual) as T;
  }

  public getChapter(): ChapterInterface | null {
    return useAppSelector((state) => state.backoffice.chapter.data, shallowEqual);
  }

  public getChapterIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.chapter.is_loading, shallowEqual);
  }

  public getChapterIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.chapter.data != null, shallowEqual);
  }

  public getChapterType(): CategoryTypeEnum | null {
    return useAppSelector((state) => state.backoffice.chapter.data?.type ?? null, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadShow(id: number): void {
    const params: GetChapterParams = {
      id: id,
    };
    store.dispatch(update({ is_loading: true }));

    ChapterApi.show(params)
      .then((response) => {
        store.dispatch(update({ data: response, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadShow(id);
            });
            break;
          default:
            toast.error(String(e.data.error));
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }

  public transformShowResponseToCreateEditState(chapter: GetChapterResponse) {
    let params: any = {
      story: chapter.story,
      name: chapter.name,
      chapter_number: chapter.chapter_number,
      type: chapter.type,
      status: chapter.status,
      cover_image: chapter.cover_image,
    };
    const mapNodes = this.transformTextToEditor(chapter.text, chapter.images, chapter.audio);

    if (chapter.type == CategoryTypeEnum.NOVEL) {
      params.text_editor = mapNodes;
    }
    if (chapter.type == CategoryTypeEnum.MANGA) {
      params.manga_editor = mapNodes;
    }

    return params;
  }

  public transformTextToEditor(
    text: string,
    images: ImageInterface[],
    audio: AudioInterface[],
    screen: ImageResponsiveEnum = ImageResponsiveEnum.DESKTOP,
  ) {
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
