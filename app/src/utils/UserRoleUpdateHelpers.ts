import { PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import { UserRoleCreateEditSliceInterface } from "@interfaces/backoffice/UserRoleInterface";

export function validateName(name: string | null, errorMessage = "จำเป็นต้องระบุชื่อ") {
  if (name == null || (name != null && name.length == 0)) {
    return errorMessage;
  }
  return "";
}

export function validateDescription(description: string | null, minimum: number = 50, maximum: number = 2000) {
  if (description != null && description.length == 0) {
    return "จำเป็นต้องมีรายละเอียด";
  }

  if (description != null && description.length <= minimum) {
    return `จำเป็นต้องมีรายละเอียด อย่างน้อย ${minimum} ตัวอักษร`;
  }

  if (description != null && description.length > maximum) {
    return `จำกัดตัวอักษรไม่เกิน ${maximum} ตัวอักษร`;
  }
  return "";
}

export function validatePermissions(permissions: PermissionListInterface[]) {
  if (permissions.length == 0) {
    return "จำเป็นต้องเลือก Permission อย่างน้อย 1 ตัว";
  }
  return "";
}

export function createValidateParams(state: UserRoleCreateEditSliceInterface) {
  let validateParams: any = {};
  validateParams.name_error_message = validateName(state.name, "จำเป็นต้องระบุชื่อ");
  validateParams.description_error_message = validateDescription(state.description, 5, 200);
  validateParams.permissions_error_message = validatePermissions(state.permissions);
  return validateParams;
}

export function isValid(validateParams: any) {
  return Object.values(validateParams).every((value) => typeof value === "string" && value.length == 0);
}
