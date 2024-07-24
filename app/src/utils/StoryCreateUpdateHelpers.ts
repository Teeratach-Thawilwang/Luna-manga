import { CategoryListInterface } from "@interfaces/backoffice/CategoryInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { StoryCreateEditSliceInterface } from "@interfaces/backoffice/StoryInterface";

export function validateName(name: string | null) {
  if (name != null && name.length == 0) {
    return "จำเป็นต้องกำหนดชื่อตอน";
  }
  return "";
}

export function validateDescription(description: string | null, minimum: number = 50, maximum: number = 2000) {
  if (description != null && description.length == 0) {
    return "จำเป็นต้องมีเรื่องย่อ";
  }

  if (description != null && description.length <= minimum) {
    return `จำเป็นต้องมีเรื่องย่อ อย่างน้อย ${minimum} ตัวอักษร`;
  }

  if (description != null && description.length > maximum) {
    return `จำกัดตัวอักษรไม่เกิน ${maximum} ตัวอักษร`;
  }
  return "";
}

export function validateCategories(categories: CategoryListInterface[]) {
  if (categories.length == 0) {
    return "จำเป็นต้องมีหมวดหมู่อย่างน้อย 1 หมวด";
  }
  return "";
}

export function validateCoverImage(coverImage: File | ImageInterface | null) {
  if (coverImage == null) {
    return "จำเป็นต้องมีรูปหน้าปก";
  }
  return "";
}

export function createValidateParams(state: StoryCreateEditSliceInterface) {
  let validateParams: any = {};
  validateParams.name_error_message = validateName(state.name);
  validateParams.description_error_message = validateDescription(state.description);
  validateParams.categories_error_message = validateCategories(state.categories);
  validateParams.cover_image_error_message = validateCoverImage(state.cover_image);
  return validateParams;
}

export function isValid(validateParams: any) {
  return Object.values(validateParams).every((value) => typeof value === "string" && value.length == 0);
}
