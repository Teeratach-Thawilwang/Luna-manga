import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { WidgetStatusEnum } from "@enums/backoffice/StatusEnum";
import { WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { CreateWidgetParams, DeleteWidgetParams, UpdateWidgetParams, WidgetCreateEditSliceInterface } from "@interfaces/backoffice/WidgetInterface";
import WidgetApi from "@repositories/backoffice/WidgetApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/WidgetCreateEditSlice";
import { navigateTo } from "@utils/Helpers";

class WidgetCreateEditService {
  public clearState() {
    store.dispatch(
      update({
        name: null,
        title: null,
        type: null,
        status: null,
        banners: [],

        name_error_message: "",
        title_error_message: "",
        banner_error_message: "",
      }),
    );
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.widgetCreateEdit[key], shallowEqual) as T;
  }

  public getState(): WidgetCreateEditSliceInterface {
    return useAppSelector((state) => state.backoffice.widgetCreateEdit, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public createWidget(name: string, title: string, type: WidgetTypeEnum, status: WidgetStatusEnum, bannerIds: number[]): void {
    const params: CreateWidgetParams = {
      name: name,
      title: title,
      type: type,
      status: status,
      banner_ids: bannerIds,
    };

    WidgetApi.create(params)
      .then((_response) => {
        toast.success("Create Sucessfully.");
        navigateTo(GroupSettingUrlEnum.WIDGET_LIST);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createWidget(name, title, type, status, bannerIds);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public updateWidget(id: number, name: string, title: string, type: WidgetTypeEnum, status: WidgetStatusEnum, bannerIds: number[]): void {
    const params: UpdateWidgetParams = {
      id: id,
      name: name,
      title: title,
      type: type,
      status: status,
      banner_ids: bannerIds,
    };

    WidgetApi.update(params)
      .then((_response) => {
        toast.success("Update Sucessfully.");
        navigateTo(GroupSettingUrlEnum.WIDGET_LIST);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateWidget(id, name, title, type, status, bannerIds);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public deleteWidget(id: number): void {
    const params: DeleteWidgetParams = {
      id: id,
    };

    WidgetApi.delete(params)
      .then((_response) => {
        toast.success("Delete Sucessfully.");
        navigateTo(GroupSettingUrlEnum.WIDGET_LIST);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.deleteWidget(id);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new WidgetCreateEditService();
