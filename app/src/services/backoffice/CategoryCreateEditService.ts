import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { CategoryStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  CategoryCreateEditSliceInterface,
  CreateCategoryParams,
  DeleteCategoryParams,
  UpdateCategoryParams,
} from "@interfaces/backoffice/CategoryInterface";
import CategoryApi from "@repositories/backoffice/CategoryApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/CategoryCreateEditSlice";
import { navigateTo } from "@utils/Helpers";

class CategoryCreateEditService {
  public clearState() {
    store.dispatch(
      update({
        name: null,
        type: null,
        status: null,
        image: null,

        name_error_message: "",
        type_error_message: "",
        image_error_message: "",
      }),
    );
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.categoryCreateEdit[key], shallowEqual) as T;
  }

  public getState(): CategoryCreateEditSliceInterface {
    return useAppSelector((state) => state.backoffice.categoryCreateEdit, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public createCategory(name: string, type: CategoryTypeEnum, status: CategoryStatusEnum, imageId?: number): void {
    const params: CreateCategoryParams = {
      name: name,
      type: type,
      status: status,
    };

    if (imageId != undefined) {
      params["image_id"] = imageId;
    }

    CategoryApi.create(params)
      .then((_response) => {
        toast.success("Create Sucessfully.");
        navigateTo(GroupSettingUrlEnum.CATEGORY);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createCategory(name, type, status, imageId);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public updateCategory(id: number, name: string, type: CategoryTypeEnum, status: CategoryStatusEnum, imageId?: number): void {
    const params: UpdateCategoryParams = {
      id: id,
      name: name,
      type: type,
      status: status,
    };

    if (imageId != undefined) {
      params["image_id"] = imageId;
    }

    CategoryApi.update(params)
      .then((_response) => {
        toast.success("Update Sucessfully.");
        navigateTo(GroupSettingUrlEnum.CATEGORY);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateCategory(id, name, type, status, imageId);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public deleteCategory(id: number): void {
    const params: DeleteCategoryParams = {
      id: id,
    };

    CategoryApi.delete(params)
      .then((_response) => {
        toast.success("Delete Sucessfully.");
        navigateTo(GroupSettingUrlEnum.CATEGORY);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.deleteCategory(id);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new CategoryCreateEditService();
