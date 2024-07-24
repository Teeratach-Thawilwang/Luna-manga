import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { CategoryCreateEditSliceInterface } from "@interfaces/backoffice/CategoryInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";

export function validateName(name: string | null, errorMessage = "จำเป็นต้องระบุชื่อ") {
  if (name == null || (name != null && name.length == 0)) {
    return errorMessage;
  }
  return "";
}

export function validateImage(image: File | ImageInterface | null) {
  if (image == null) {
    return "จำเป็นต้องเลือกรูปภาพ";
  }
  return "";
}

export function validateType(type: CategoryTypeEnum | null) {
  switch (type) {
    case CategoryTypeEnum.MANGA:
      return "";
    case CategoryTypeEnum.NOVEL:
      return "";
    default:
      return "จำเป็นต้องเลือกประเภทหมวดหมู่";
  }
}

export function createValidateParams(state: CategoryCreateEditSliceInterface) {
  let validateParams: any = {};
  validateParams.name_error_message = validateName(state.name, "จำเป็นต้องระบุชื่อ");
  validateParams.type_error_message = validateType(state.type);
  // validateParams.image_error_message = validateImage(state.image);

  return validateParams;
}

export function isValid(validateParams: any) {
  return Object.values(validateParams).every((value) => typeof value === "string" && value.length == 0);
}
