import { BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { BannerCreateEditSliceInterface, BannerImageInterface } from "@interfaces/backoffice/BannerInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import ValidationService from "@services/ValidationService";

export function validateName(name: string | null, errorMessage = "จำเป็นต้องระบุชื่อ") {
  if (name == null || (name != null && name.length == 0)) {
    return errorMessage;
  }
  return "";
}

export function validateUrl(url: string | null, errorMessage = "จำเป็นต้องระบุ Url") {
  if (url == null || (url != null && url.length == 0)) {
    return errorMessage;
  }

  const { isSuccess, errorMessage: error } = ValidationService.validateURL(url);
  if (!isSuccess) {
    return error;
  }
  return "";
}

export function validateIdByType(id: number | null | undefined, type: BannerTypeEnum | null, errorMessage: string) {
  if (type != null && type != BannerTypeEnum.STORY && type != BannerTypeEnum.CHAPTER) {
    return "";
  }

  if (id == null || id == undefined) {
    return errorMessage;
  }

  return "";
}

export function validateImageByType(images: BannerImageInterface[] | ImageInterface[], type: BannerTypeEnum | null, errorMessage: string) {
  if (type != null && (type == BannerTypeEnum.STORY || type == BannerTypeEnum.CHAPTER)) {
    return "";
  }

  let isValid = true;
  switch (type) {
    case BannerTypeEnum.STORY_WINDOW:
      isValid = images.some(
        (image) =>
          image.collection_name == CollectionEnum.BANNER_STORY_WINDOW_1 ||
          image.collection_name == CollectionEnum.BANNER_STORY_WINDOW_2 ||
          image.collection_name == CollectionEnum.BANNER_STORY_WINDOW_3,
      );
      return isValid ? "" : errorMessage;
    case BannerTypeEnum.ADVERTISEMENT_SMALL:
      isValid = images.some((image) => image.collection_name == CollectionEnum.BANNER_ADVERTISEMENT_SMALL);
      return isValid ? "" : errorMessage;
    case BannerTypeEnum.ADVERTISEMENT_MEDIUM:
      isValid = images.some((image) => image.collection_name == CollectionEnum.BANNER_ADVERTISEMENT_MEDIUM);
      return isValid ? "" : errorMessage;
    case BannerTypeEnum.ADVERTISEMENT_GROUP:
      isValid = images.some((image) => image.collection_name == CollectionEnum.BANNER_ADVERTISEMENT_GROUP);
      return isValid ? "" : errorMessage;
  }

  return "";
}

export function createValidateParams(state: BannerCreateEditSliceInterface) {
  let validateParams: any = {};
  validateParams.name_error_message = validateName(state.name, "จำเป็นต้องระบุชื่อ");
  validateParams.title_error_message = validateName(state.title, "จำเป็นต้องระบุชื่อที่ใช้แสดงบนหน้าเว็ป");
  validateParams.images_error_message = validateImageByType(state.images, state.type, "จำเป็นต้องเลือกรูปภาพ");

  if (state.type == BannerTypeEnum.CHAPTER) {
    validateParams.chapter_error_message = validateIdByType(state.chapter?.id, state.type, "จำเป็นต้องเลือก Chapter");
  }

  if (state.type == BannerTypeEnum.STORY) {
    validateParams.story_error_message = validateIdByType(state.story?.id, state.type, "จำเป็นต้องเลือก Story");
  }

  const isInTypeAdvertisement = [
    BannerTypeEnum.ADVERTISEMENT_SMALL,
    BannerTypeEnum.ADVERTISEMENT_MEDIUM,
    BannerTypeEnum.ADVERTISEMENT_GROUP,
  ].includes(state.type as BannerTypeEnum);
  if (isInTypeAdvertisement) {
    validateParams.link_error_message = validateUrl(state.link, "จำเป็นต้องระบุ Url");
  }
  return validateParams;
}

export function isValid(validateParams: any) {
  return Object.values(validateParams).every((value) => typeof value === "string" && value.length == 0);
}
