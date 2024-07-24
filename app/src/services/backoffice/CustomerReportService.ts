import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  CustomerReportInterface,
  CustomerReportSliceInterface,
  GetCustomerReportParams,
  UpdateCustomerReportParams,
} from "@interfaces/backoffice/CustomerReportInterface";
import CustomerReportApi from "@repositories/backoffice/CustomerReportApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/CustomerReportSlice";

class CustomerReportService {
  public clearState() {
    store.dispatch(update({ data: null, is_loading: false, error: "" }));
  }

  public getState(): CustomerReportSliceInterface {
    return useAppSelector((state) => state.backoffice.customerReport, shallowEqual);
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.customerReport.data![key], shallowEqual) as T;
  }

  public getCustomerReport(): CustomerReportInterface | null {
    return useAppSelector((state) => state.backoffice.customerReport.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.customerReport.data != null, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadShow(id: number): void {
    const params: GetCustomerReportParams = {
      id: id,
    };
    store.dispatch(update({ is_loading: true }));

    CustomerReportApi.show(params)
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

  public updateCustomerReport(id: number, isAccept: boolean): void {
    const params: UpdateCustomerReportParams = {
      id: id,
      is_accept: isAccept,
    };
    store.dispatch(update({ is_loading: true }));

    CustomerReportApi.update(params)
      .then((response) => {
        toast.success("Update Sucessfully.");
        store.dispatch(update({ data: response, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateCustomerReport(id, isAccept);
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

export default new CustomerReportService();
