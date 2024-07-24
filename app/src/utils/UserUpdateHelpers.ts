import { UserCreateEditSliceInterface } from "@interfaces/backoffice/UserInterface";
import ValidationService from "@services/ValidationService";

export function validateEmail(name: string | null) {
  if (name != null && name.length == 0) {
    return "จำเป็นต้องมีอีเมล";
  }

  const { isSuccess, errorMessage } = ValidationService.validateEmail(name ?? "");
  if (!isSuccess) {
    return errorMessage;
  }

  return "";
}

export function validatePassword(password: string | null) {
  if (password != null && password.length == 0) {
    return "จำเป็นต้องกำหนดรหัสผ่าน";
  }

  const { isSuccess, errorMessage } = ValidationService.validatePassword(password ?? "");
  if (!isSuccess) {
    return errorMessage;
  }

  return "";
}

export function validateName(name: string | null, errorMessage = "จำเป็นต้องระบุชื่อ") {
  if (name == null || (name != null && name.length == 0)) {
    return errorMessage;
  }
  return "";
}

export function createValidateParams(state: UserCreateEditSliceInterface, isValidatePassword: boolean = true) {
  let validateParams: any = {};
  validateParams.email_error_message = validateEmail(state.email);
  validateParams.nick_name_error_message = validateName(state.nick_name, "จำเป็นต้องระบุชื่อเล่น");
  validateParams.first_name_error_message = validateName(state.first_name, "จำเป็นต้องระบุชื่อจริง");
  validateParams.last_name_error_message = validateName(state.last_name, "จำเป็นต้องระบุนามสกุล");
  if (isValidatePassword) {
    validateParams.password_error_message = validatePassword(state.password);
  }
  return validateParams;
}

export function isValid(validateParams: any) {
  return Object.values(validateParams).every((value) => typeof value === "string" && value.length == 0);
}
