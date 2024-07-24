import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { BannerStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  BannerCreateEditSliceInterface,
  BannerImageInterface,
  CreateBannerParams,
  DeleteBannerParams,
  UpdateBannerParams,
} from "@interfaces/backoffice/BannerInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import BannerApi from "@repositories/backoffice/BannerApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/BannerCreateEditSlice";
import { navigateTo } from "@utils/Helpers";

class BannerCreateEditService {
  public clearState() {
    store.dispatch(
      update({
        name: null,
        title: null,
        type: null,
        link: null,
        status: null,
        story: null,
        chapter: null,
        images: [],
        name_error_message: "",
        title_error_message: "",
        link_error_message: "",
        story_error_message: "",
        chapter_error_message: "",
        images_error_message: "",
      }),
    );
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.bannerCreateEdit[key], shallowEqual) as T;
  }

  public getState(): BannerCreateEditSliceInterface {
    return useAppSelector((state) => state.backoffice.bannerCreateEdit, shallowEqual);
  }

  public getImageByCollection(collection: CollectionEnum): BannerImageInterface | ImageInterface | null {
    return useAppSelector((state) => {
      const image = state.backoffice.bannerCreateEdit.images.filter((image) => image.collection_name == collection);
      return image.length > 0 ? image[0] : null;
    }, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public createBanner(
    name: string,
    title: string,
    type: BannerTypeEnum,
    link: string,
    status: BannerStatusEnum,
    storyId: number | null,
    chapterId: number | null,
    imageIds: number[],
  ): void {
    const params: CreateBannerParams = {
      name: name,
      title: title,
      type: type,
      link: link,
      status: status,
      story_id: storyId,
      chapter_id: chapterId,
      image_ids: imageIds,
    };

    BannerApi.create(params)
      .then((_response) => {
        toast.success("Create Sucessfully.");
        navigateTo(GroupSettingUrlEnum.BANNER);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createBanner(name, title, type, link, status, storyId, chapterId, imageIds);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public updateBanner(
    id: number,
    name: string,
    title: string,
    type: BannerTypeEnum,
    link: string,
    status: BannerStatusEnum,
    storyId: number | null,
    chapterId: number | null,
    imageIds: number[],
  ): void {
    const params: UpdateBannerParams = {
      id: id,
      name: name,
      title: title,
      type: type,
      link: link,
      status: status,
      story_id: storyId,
      chapter_id: chapterId,
      image_ids: imageIds,
    };

    BannerApi.update(params)
      .then((_response) => {
        toast.success("Update Sucessfully.");
        navigateTo(GroupSettingUrlEnum.BANNER);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateBanner(id, name, title, type, link, status, storyId, chapterId, imageIds);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public deleteBanner(id: number): void {
    const params: DeleteBannerParams = {
      id: id,
    };

    BannerApi.delete(params)
      .then((_response) => {
        toast.success("Delete Sucessfully.");
        navigateTo(GroupSettingUrlEnum.BANNER);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.deleteBanner(id);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new BannerCreateEditService();
