import { PermissionEnum } from "@enums/backoffice/PermissionEnum";
import { PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import store from "@store/Store";
import { navigateTo } from "@utils/Helpers";

export default async function PermissionMiddleware(permission: PermissionEnum): Promise<boolean> {
  const user = store.getState().backoffice.userProfile.data;
  if (user == null) {
    return false;
  }

  const userPermissions = user.permissions;
  const isPermissionExist = userPermissions.some((userPerm: PermissionListInterface) => userPerm.name == permission);
  if (isPermissionExist) {
    return true;
  }
  navigateTo("/backoffice");
  return false;
}
