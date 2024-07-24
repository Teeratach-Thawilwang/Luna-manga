import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { DashboardInterface, DashboardSliceInterface } from "@interfaces/backoffice/DashboardInterface";
import DashboardApi from "@repositories/backoffice/DashboardApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/DashboardSlice";

class DashboardService {
  public clearState() {
    store.dispatch(update({ data: [], is_loading: false, error: "" }));
  }

  public getState(): DashboardSliceInterface {
    return useAppSelector((state) => state.backoffice.dashboard, shallowEqual);
  }

  public getDashboard(): DashboardInterface[] {
    return useAppSelector((state) => state.backoffice.dashboard.data, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.dashboard.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.dashboard.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public async loadDashboard(): Promise<boolean> {
    store.dispatch(update({ is_loading: true }));

    return DashboardApi.getDashboard({})
      .then((response) => {
        store.dispatch(update({ data: response.data, is_loading: false }));
        return true;
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadDashboard();
            });
            return true;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            throw e;
        }
      });
  }
}

export default new DashboardService();
