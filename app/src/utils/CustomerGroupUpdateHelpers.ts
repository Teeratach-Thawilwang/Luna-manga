import { CustomerGroupCreateEditSliceInterface } from "@interfaces/backoffice/CustomerGroupInterface";

export function validateName(name: string | null, errorMessage = "จำเป็นต้องระบุชื่อ") {
  if (name == null || (name != null && name.length == 0)) {
    return errorMessage;
  }
  return "";
}

export function createValidateParams(state: CustomerGroupCreateEditSliceInterface) {
  let validateParams: any = {};
  validateParams.name_error_message = validateName(state.name, "จำเป็นต้องระบุชื่อกลุ่มลูกค้า");
  return validateParams;
}

export function isValid(validateParams: any) {
  return Object.values(validateParams).every((value) => typeof value === "string" && value.length == 0);
}
