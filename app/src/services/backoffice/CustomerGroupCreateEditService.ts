import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { CustomerGroupStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  CreateCustomerGroupParams,
  CustomerGroupCreateEditSliceInterface,
  DeleteCustomerGroupParams,
  UpdateCustomerGroupParams,
} from "@interfaces/backoffice/CustomerGroupInterface";
import CustomerGroupApi from "@repositories/backoffice/CustomerGroupApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/CustomerGroupCreateEditSlice";
import { navigateTo } from "@utils/Helpers";

class CustomerGroupCreateEditService {
  public clearState() {
    store.dispatch(
      update({
        name: null,
        status: null,
        name_error_message: "",
      }),
    );
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.customerGroupCreateEdit[key], shallowEqual) as T;
  }

  public getState(): CustomerGroupCreateEditSliceInterface {
    return useAppSelector((state) => state.backoffice.customerGroupCreateEdit, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public createCustomerGroup(name: string, status: CustomerGroupStatusEnum): void {
    const params: CreateCustomerGroupParams = {
      name: name,
      status: status,
    };

    CustomerGroupApi.create(params)
      .then((_response) => {
        toast.success("Create Sucessfully.");
        navigateTo(GroupSettingUrlEnum.CUSTOMER_GROUP);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createCustomerGroup(name, status);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public updateCustomerGroup(id: number, name: string, status: CustomerGroupStatusEnum): void {
    const params: UpdateCustomerGroupParams = {
      id: id,
      name: name,
      status: status,
    };

    CustomerGroupApi.update(params)
      .then((_response) => {
        toast.success("Update Sucessfully.");
        navigateTo(GroupSettingUrlEnum.CUSTOMER_GROUP);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateCustomerGroup(id, name, status);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public deleteCustomerGroup(id: number): void {
    const params: DeleteCustomerGroupParams = {
      id: id,
    };

    CustomerGroupApi.delete(params)
      .then((_response) => {
        toast.success("Delete Sucessfully.");

        navigateTo(GroupSettingUrlEnum.CUSTOMER_GROUP);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.deleteCustomerGroup(id);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new CustomerGroupCreateEditService();
