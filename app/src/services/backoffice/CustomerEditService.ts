import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { CustomerStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { CustomerEditSliceInterface, UpdateCustomerParams } from "@interfaces/backoffice/CustomerInterface";
import CustomerApi from "@repositories/backoffice/CustomerApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/CustomerEditSlice";
import { navigateTo } from "@utils/Helpers";

class CustomerEditService {
  public clearState() {
    store.dispatch(
      update({
        email: null,
        nick_name: null,
        first_name: null,
        last_name: null,
        status: null,
        profile_image: null,
        customer_group: null,
        email_error_message: "",
        nick_name_error_message: "",
        first_name_error_message: "",
        last_name_error_message: "",
        profile_image_error_message: "",
        customer_group_error_message: "",
      }),
    );
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.customerEdit[key], shallowEqual) as T;
  }

  public getState(): CustomerEditSliceInterface {
    return useAppSelector((state) => state.backoffice.customerEdit, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public updateCustomer(
    id: number,
    email: string,
    nickName: string,
    firstName: string,
    lastName: string,
    status: CustomerStatusEnum,
    profileImageId: number,
    customerGroupId: number,
  ): void {
    const params: UpdateCustomerParams = {
      id: id,
      email: email,
      nick_name: nickName,
      first_name: firstName,
      last_name: lastName,
      status: status,
      profile_image_id: profileImageId,
      customer_group_id: customerGroupId,
    };

    CustomerApi.update(params)
      .then((_response) => {
        toast.success("Update Sucessfully.");

        navigateTo(GroupSettingUrlEnum.CUSTOMER_LIST);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateCustomer(id, email, nickName, firstName, lastName, status, profileImageId, customerGroupId);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new CustomerEditService();
