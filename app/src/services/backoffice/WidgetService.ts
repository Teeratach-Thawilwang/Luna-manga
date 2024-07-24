import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { GetWidgetParams, WidgetInterface, WidgetSliceInterface } from "@interfaces/backoffice/WidgetInterface";
import WidgetApi from "@repositories/backoffice/WidgetApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/WidgetSlice";

class WidgetService {
  public clearState() {
    store.dispatch(update({ data: null, is_loading: false, error: "" }));
  }

  public getState(): WidgetSliceInterface {
    return useAppSelector((state) => state.backoffice.widget, shallowEqual);
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.widget.data![key], shallowEqual) as T;
  }

  public getWidget(): WidgetInterface | null {
    return useAppSelector((state) => state.backoffice.widget.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.widget.data != null, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadShow(id: number): void {
    const params: GetWidgetParams = {
      id: id,
    };
    store.dispatch(update({ is_loading: true }));

    WidgetApi.show(params)
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
}

export default new WidgetService();
