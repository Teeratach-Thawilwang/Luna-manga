import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { StoryStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { CreateStoryParams, DeleteStoryParams, StoryCreateEditSliceInterface, UpdateStoryParams } from "@interfaces/backoffice/StoryInterface";
import StoryApi from "@repositories/backoffice/StoryApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/StoryCreateEditSlice";
import { navigateTo } from "@utils/Helpers";

class StoryCreateEditService {
  public clearState() {
    store.dispatch(
      update({
        name: null,
        type: null,
        description: null,
        status: null,
        categories: [],
        cover_image: null,
        name_error_message: "",
        description_error_message: "",
        categories_error_message: "",
        cover_image_error_message: "",
      }),
    );
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.storyCreateEdit[key], shallowEqual) as T;
  }

  public getState(): StoryCreateEditSliceInterface {
    return useAppSelector((state) => state.backoffice.storyCreateEdit, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public createStory(
    name: string,
    type: CategoryTypeEnum,
    description: string,
    status: StoryStatusEnum,
    categoryIds: number[],
    coverImageId: number,
  ): void {
    const params: CreateStoryParams = {
      name: name,
      type: type,
      description: description,
      status: status,
      category_ids: categoryIds,
      cover_image_id: coverImageId,
    };

    StoryApi.create(params)
      .then((_response) => {
        toast.success("Create Sucessfully.");

        const redirectUrl = type == CategoryTypeEnum.MANGA ? GroupSettingUrlEnum.MANGA : GroupSettingUrlEnum.NOVEL;
        navigateTo(redirectUrl);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createStory(name, type, description, status, categoryIds, coverImageId);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public updateStory(
    id: number,
    name: string,
    type: CategoryTypeEnum,
    description: string,
    status: StoryStatusEnum,
    categoryIds: number[],
    coverImageId: number,
  ): void {
    const params: UpdateStoryParams = {
      id: id,
      name: name,
      type: type,
      description: description,
      status: status,
      category_ids: categoryIds,
      cover_image_id: coverImageId,
    };

    StoryApi.update(params)
      .then((_response) => {
        toast.success("Update Sucessfully.");

        const redirectUrl = type == CategoryTypeEnum.MANGA ? GroupSettingUrlEnum.MANGA : GroupSettingUrlEnum.NOVEL;
        navigateTo(redirectUrl);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateStory(id, name, type, description, status, categoryIds, coverImageId);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public deleteStory(id: number, type: CategoryTypeEnum): void {
    const params: DeleteStoryParams = {
      id: id,
    };

    StoryApi.delete(params)
      .then((_response) => {
        toast.success("Delete Sucessfully.");

        const redirectUrl = type == CategoryTypeEnum.MANGA ? GroupSettingUrlEnum.MANGA : GroupSettingUrlEnum.NOVEL;
        navigateTo(redirectUrl);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.deleteStory(id, type);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new StoryCreateEditService();
