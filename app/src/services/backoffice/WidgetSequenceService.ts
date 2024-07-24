import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { UpdateWidgetSequenceParams, WidgetSequenceInterface, WidgetSequenceSliceInterface } from "@interfaces/backoffice/WidgetInterface";
import WidgetSequenceApi from "@repositories/backoffice/WidgetSequenceApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { deleteById, update } from "@store/slices/backoffice/WidgetSequenceSlice";

class WidgetSequenceService {
  public clearState() {
    store.dispatch(update({ data: [], is_loading: false, error: "" }));
  }

  public getState(): WidgetSequenceSliceInterface {
    return useAppSelector((state) => state.backoffice.widgetSequence, shallowEqual);
  }

  public getData(): WidgetSequenceInterface[] {
    return useAppSelector((state) => state.backoffice.widgetSequence.data, shallowEqual);
  }

  public getIds(): number[] {
    return useAppSelector((state) => state.backoffice.widgetSequence.data.map((widget) => widget.id), shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.widgetSequence.data != null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.widgetSequence.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.widgetSequence.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public deleteById(id: number): void {
    store.dispatch(deleteById({ id: id }));
  }

  public loadWidgetSequence(): void {
    store.dispatch(update({ is_loading: true }));

    WidgetSequenceApi.index({})
      .then((response) => {
        store.dispatch(update({ data: response.data, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadWidgetSequence();
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }

  public updateWidgetSequence(ids: number[]): void {
    store.dispatch(update({ is_loading: true }));

    const params: UpdateWidgetSequenceParams = {
      widget_ids: ids,
    };

    WidgetSequenceApi.update(params)
      .then((response) => {
        store.dispatch(update({ data: response.data, is_loading: false }));
        toast.success("Successfully.");
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateWidgetSequence(ids);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new WidgetSequenceService();
