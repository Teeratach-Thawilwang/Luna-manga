import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { WidgetTypeEnum } from "@enums/frontside/WidgetTypeEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { WidgetInterface, WidgetOnPageSliceInterface } from "@interfaces/frontside/WidgetOnPageInterface";
import WidgetOnPageApi from "@repositories/frontside/WidgetOnPageApi";
import AuthService from "@services/frontside/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/frontside/WidgetOnPageSlice";
import { navigateTo } from "@utils/Helpers";

class WidgetOnPageService {
  public clearState() {
    store.dispatch(update({ data: [], is_loading: false, error: "" }));
  }

  public getState(): WidgetOnPageSliceInterface {
    return useAppSelector((state) => state.frontside.widgetOnPage, shallowEqual);
  }

  public getWidgetOnPages(): WidgetInterface[] {
    return useAppSelector((state) => state.frontside.widgetOnPage.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => {
      const { data, is_loading, error } = state.frontside.widgetOnPage;
      return data.length != 0 && is_loading == false && error.length == 0;
    }, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.frontside.widgetOnPage.error, shallowEqual);
  }

  public getWidgetByType(type: WidgetTypeEnum, n: number = 0): WidgetInterface | null {
    return useAppSelector((state) => {
      return state.frontside.widgetOnPage.data?.filter((widget) => widget.type === type)[n] ?? null;
    }, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadWidgetOnPage(): void {
    store.dispatch(update({ is_loading: true }));

    WidgetOnPageApi.index({})
      .then((response) => {
        store.dispatch(update({ data: response.data, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadWidgetOnPage();
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }
}

export default new WidgetOnPageService();
