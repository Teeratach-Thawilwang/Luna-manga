import { CustomerGroupStatusEnum } from "@enums/backoffice/StatusEnum";
import { CustomerGroupListInterface } from "@interfaces/backoffice/CustomerGroupInterface";
import { CustomerEditSliceInterface } from "@interfaces/backoffice/CustomerInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
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

export function validateName(name: string | null, errorMessage = "จำเป็นต้องระบุชื่อ") {
  if (name == null || (name != null && name.length == 0)) {
    return errorMessage;
  }
  return "";
}

export function validateCustomerGroup(customerGroup: CustomerGroupListInterface | null) {
  if (customerGroup == null) {
    return "จำเป็นต้องมีหมวดหมู่อย่างน้อย 1 หมวด";
  }

  if (customerGroup.status == CustomerGroupStatusEnum.INACTIVE) {
    return "ต้องกำหนดเป็น customer group ที่มี status active";
  }
  return "";
}

export function validateProfileImage(image: File | ImageInterface | null) {
  if (image == null) {
    return "จำเป็นต้องมีรูปโปรไฟล์";
  }
  return "";
}

export function createValidateParams(state: CustomerEditSliceInterface) {
  let validateParams: any = {};
  validateParams.email_error_message = validateEmail(state.email);
  validateParams.nick_name_error_message = validateName(state.nick_name, "จำเป็นต้องระบุชื่อเล่น");
  validateParams.first_name_error_message = validateName(state.first_name, "จำเป็นต้องระบุชื่อจริง");
  validateParams.last_name_error_message = validateName(state.last_name, "จำเป็นต้องระบุนามสกุล");
  validateParams.profile_image_error_message = validateProfileImage(state.profile_image);
  validateParams.customer_group_error_message = validateCustomerGroup(state.customer_group);
  return validateParams;
}

export function isValid(validateParams: any) {
  return Object.values(validateParams).every((value) => typeof value === "string" && value.length == 0);
}
