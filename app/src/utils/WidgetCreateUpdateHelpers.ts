import { BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import { WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";
import { BannerListInterface } from "@interfaces/backoffice/BannerInterface";
import { WidgetCreateEditSliceInterface } from "@interfaces/backoffice/WidgetInterface";

export function validateName(name: string | null, errorMessage = "จำเป็นต้องระบุชื่อ") {
  if (name == null || (name != null && name.length == 0)) {
    return errorMessage;
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

export function validateBanners(banners: BannerListInterface[], widgetType: WidgetTypeEnum | null) {
  if (banners.length == 0) {
    return "จำเป็นต้องเลือก Banner อย่างน้อย 1 ตัว";
  }

  const bannerType = banners[0].type;
  const isSameBannerType = banners.every((banner) => banner.type == bannerType);
  if (!isSameBannerType) {
    return "Banner Type ไม่ตรงกัน";
  }

  const expectBannerType = getBannerTypeFromWidgetType(widgetType);
  if (widgetType != null && expectBannerType != bannerType) {
    return "Banner Type ไม่สอดคล้องกับ Widget";
  }

  return "";
}

export function getBannerTypeFromWidgetType(type: WidgetTypeEnum | null): BannerTypeEnum {
  switch (type) {
    case WidgetTypeEnum.STORY_LIST:
      return BannerTypeEnum.STORY;
    case WidgetTypeEnum.STORY_WINDOW:
      return BannerTypeEnum.STORY_WINDOW;
    case WidgetTypeEnum.STORY_GROUP:
      return BannerTypeEnum.STORY;
    case WidgetTypeEnum.CHAPTER_GROUP:
      return BannerTypeEnum.CHAPTER;
    case WidgetTypeEnum.ADVERTISEMENT_SMALL:
      return BannerTypeEnum.ADVERTISEMENT_SMALL;
    case WidgetTypeEnum.ADVERTISEMENT_MEDIUM:
      return BannerTypeEnum.ADVERTISEMENT_MEDIUM;
    case WidgetTypeEnum.ADVERTISEMENT_GROUP:
      return BannerTypeEnum.ADVERTISEMENT_GROUP;
    default:
      return BannerTypeEnum.STORY;
  }
}

export function createValidateParams(state: WidgetCreateEditSliceInterface) {
  let validateParams: any = {};
  validateParams.name_error_message = validateName(state.name, "จำเป็นต้องระบุชื่อ");
  validateParams.title_error_message = validateName(state.title, "จำเป็นต้องระบุชื่อที่ใช้แสดงบนหน้าเว็ป");
  validateParams.banner_error_message = validateBanners(state.banners, state.type);

  return validateParams;
}

export function isValid(validateParams: any) {
  return Object.values(validateParams).every((value) => typeof value === "string" && value.length == 0);
}
