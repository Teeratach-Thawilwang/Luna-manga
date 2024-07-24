import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  CreateUserRoleParams,
  DeleteUserRoleParams,
  UpdateUserRoleParams,
  UserRoleCreateEditSliceInterface,
} from "@interfaces/backoffice/UserRoleInterface";
import UserRoleApi from "@repositories/backoffice/UserRoleApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/UserRoleCreateEditSlice";
import { navigateTo } from "@utils/Helpers";

class UserRoleCreateEditService {
  public clearState() {
    store.dispatch(
      update({
        name: null,
        description: null,
        permissions: [],
        users: [],
        name_error_message: "",
        description_error_message: "",
        permissions_error_message: "",
      }),
    );
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.userRoleCreateEdit[key], shallowEqual) as T;
  }

  public getState(): UserRoleCreateEditSliceInterface {
    return useAppSelector((state) => state.backoffice.userRoleCreateEdit, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public createUserRole(name: string, description: string, permissionIds: number[], userIds: number[]): void {
    const params: CreateUserRoleParams = {
      name: name,
      description: description,
      permission_ids: permissionIds,
      user_ids: userIds,
    };

    UserRoleApi.create(params)
      .then((_response) => {
        toast.success("Create Sucessfully.");
        navigateTo(GroupSettingUrlEnum.USER_ROLE, true);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createUserRole(name, description, permissionIds, userIds);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public updateUserRole(id: number, name: string, description: string, permissionIds: number[], userIds: number[]): void {
    const params: UpdateUserRoleParams = {
      id: id,
      name: name,
      description: description,
      permission_ids: permissionIds,
      user_ids: userIds,
    };

    UserRoleApi.update(params)
      .then((_response) => {
        toast.success("Update Sucessfully.");
        navigateTo(GroupSettingUrlEnum.USER_ROLE, true);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateUserRole(id, name, description, permissionIds, userIds);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public deleteUserRole(id: number): void {
    const params: DeleteUserRoleParams = {
      id: id,
    };

    UserRoleApi.delete(params)
      .then((_response) => {
        toast.success("Delete Sucessfully.");
        navigateTo(GroupSettingUrlEnum.USER_ROLE);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.deleteUserRole(id);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new UserRoleCreateEditService();
