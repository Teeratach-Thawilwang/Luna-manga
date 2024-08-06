import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { PaginationInterface } from "@interfaces/frontside/PaginationInterface";
import {
  WidgetIndexParams,
  WidgetSliceInterface,
  WidgetStateInterface,
  WidgetsBannersParams,
  WidgetsBannersResponse,
} from "@interfaces/frontside/WidgetInterface";
import WidgetApi from "@repositories/frontside/WidgetApi";
import AuthService from "@services/frontside/AuthService";
import CookieService from "@services/frontside/CookieService";
import store, { useAppSelector } from "@store/Store";
import { pushWidgets, update, updateWidgetStateById } from "@store/slices/frontside/WidgetSlice";
import { navigateTo } from "@utils/Helpers";

class WidgetService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, is_loading: false, error: "" }));
  }

  public getState(): WidgetSliceInterface {
    return useAppSelector((state) => state.frontside.widget, shallowEqual);
  }

  public getWidgets(): WidgetStateInterface[] {
    return useAppSelector((state) => state.frontside.widget.data, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.widget.is_loading, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.frontside.widget.paginate != null, shallowEqual);
  }

  public getCurrentPage(): number {
    return useAppSelector((state) => state.frontside.widget.paginate?.current ?? 1, shallowEqual);
  }

  public getLastPage(): number | null | undefined {
    return useAppSelector((state) => state.frontside.widget.paginate?.last, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.frontside.widget.error, shallowEqual);
  }

  public getPaginateById(id: number): PaginationInterface | null {
    const widget = useAppSelector((state) => {
      const widget = state.frontside.widget.data.filter((widget) => widget.data.id === id)[0] ?? null;
      return widget.paginate ?? null;
    }, shallowEqual);
    return widget;
  }

  public getIsLoadingById(id: number): boolean | null {
    const is_loading = useAppSelector((state) => {
      const widget = state.frontside.widget.data.filter((widget) => widget.data.id === id)[0] ?? null;
      return widget.is_loading ?? null;
    }, shallowEqual);
    return is_loading;
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public pushWidgets(data: WidgetStateInterface): void {
    store.dispatch(pushWidgets(data));
  }

  public loadIndex(page: number = 1, perPage: number = 4): void {
    store.dispatch(update({ is_loading: true }));

    const params: WidgetIndexParams = {
      page: page,
      per_page: perPage,
    };

    WidgetApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        const transFormData = this.transformWidgetIndexReponseData(data);
        store.dispatch(pushWidgets({ data: transFormData, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadIndex(page);
            });
            break;
          case ResponseErrorEnum.AUTHENTICATION_FAILED:
          case ResponseErrorEnum.RESOURCE_NOT_FOUND:
            CookieService.setLogout();
            AuthService.getTokenThenCallback(() => {
              this.loadIndex(page);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public transformWidgetIndexReponseData(data: WidgetsBannersResponse[]) {
    return data.map((widget: WidgetsBannersResponse) => this.transformWidgetBannersResponseData(widget));
  }

  public transformWidgetBannersResponseData(widget: WidgetsBannersResponse): WidgetStateInterface {
    const { data, ...paginate } = widget.banners;
    return {
      data: {
        ...widget,
        banners: data,
      },
      paginate: paginate,
      is_loading: false,
      error: "",
    };
  }

  public loadWidgetBanners(id: number, page: number, perPage: number = 15) {
    store.dispatch(updateWidgetStateById({ id: id, is_loading: true }));

    const params: WidgetsBannersParams = {
      id: id,
      page: page,
      per_page: perPage,
    };

    WidgetApi.widgetBanners(params)
      .then((response) => {
        const transFormData = this.transformWidgetBannersResponseData(response);
        store.dispatch(updateWidgetStateById({ ...transFormData, id: id }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadWidgetBanners(id, page, perPage);
            });
            break;
          default:
            store.dispatch(updateWidgetStateById({ id: id, is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }
}

export default new WidgetService();
