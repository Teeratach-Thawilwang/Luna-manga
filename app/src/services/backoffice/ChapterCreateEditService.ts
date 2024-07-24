import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { ChapterStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  ChapterCreateEditSliceInterface,
  CreateChapterParams,
  DeleteChapterParams,
  UpdateChapterParams,
} from "@interfaces/backoffice/ChapterInterface";
import ChapterApi from "@repositories/backoffice/ChapterApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/ChapterCreateEditSlice";
import { navigateTo } from "@utils/Helpers";

class ChapterCreateEditService {
  public clearState() {
    store.dispatch(
      update({
        story: null,
        name: null,
        chapter_number: null,
        type: null,
        status: null,
        cover_image: null,
        text_editor: [],
        manga_editor: [],
        story_error_message: "",
        name_error_message: "",
        chapter_number_error_message: "",
        cover_image_error_message: "",
        text_editor_error_message: "",
        manga_editor_error_message: "",
      }),
    );
  }

  public clearErrorMessageState() {
    store.dispatch(
      update({
        story_error_message: "",
        name_error_message: "",
        chapter_number_error_message: "",
        cover_image_error_message: "",
        text_editor_error_message: "",
        manga_editor_error_message: "",
      }),
    );
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.chapterCreateEdit[key], shallowEqual) as T;
  }

  public getState(): ChapterCreateEditSliceInterface {
    return useAppSelector((state) => state.backoffice.chapterCreateEdit, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public createChapter(
    storyId: number,
    name: string,
    chapterNumber: number,
    type: CategoryTypeEnum,
    status: ChapterStatusEnum,
    text: string,
    coverImageId: number,
  ): void {
    const params: CreateChapterParams = {
      story_id: storyId,
      name: name,
      chapter_number: chapterNumber,
      type: type,
      status: status,
      text: text,
      cover_image_id: coverImageId,
    };

    ChapterApi.create(params)
      .then((_response) => {
        toast.success("Create Sucessfully.");

        const redirectUrl = type == CategoryTypeEnum.MANGA ? GroupSettingUrlEnum.CHAPTER_MANGA : GroupSettingUrlEnum.CHAPTER_NOVEL;
        navigateTo(redirectUrl);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createChapter(storyId, name, chapterNumber, type, status, text, coverImageId);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public updateChapter(
    chapterId: number,
    storyId: number,
    name: string,
    chapterNumber: number,
    type: CategoryTypeEnum,
    status: ChapterStatusEnum,
    text: string,
    coverImageId: number,
  ): void {
    const params: UpdateChapterParams = {
      id: chapterId,
      story_id: storyId,
      name: name,
      chapter_number: chapterNumber,
      type: type,
      status: status,
      text: text,
      cover_image_id: coverImageId,
    };

    ChapterApi.update(params)
      .then((_response) => {
        toast.success("Update Sucessfully.");

        const redirectUrl = type == CategoryTypeEnum.MANGA ? GroupSettingUrlEnum.CHAPTER_MANGA : GroupSettingUrlEnum.CHAPTER_NOVEL;
        navigateTo(redirectUrl);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateChapter(chapterId, storyId, name, chapterNumber, type, status, text, coverImageId);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public deleteChapter(chapterId: number, type: CategoryTypeEnum): void {
    const params: DeleteChapterParams = {
      id: chapterId,
    };

    ChapterApi.delete(params)
      .then((_response) => {
        toast.success("Delete Sucessfully.");

        const redirectUrl = type == CategoryTypeEnum.MANGA ? GroupSettingUrlEnum.CHAPTER_MANGA : GroupSettingUrlEnum.CHAPTER_NOVEL;
        navigateTo(redirectUrl);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.deleteChapter(chapterId, type);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new ChapterCreateEditService();
