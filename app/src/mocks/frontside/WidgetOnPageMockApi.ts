import { faker } from "@faker-js/faker";

import { BannerTypeEnum } from "@enums/frontside/BannerTypeEnum";
import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import { WidgetTypeEnum } from "@enums/frontside/WidgetTypeEnum";
import { BannerInterface } from "@interfaces/frontside/BannerInterface";
import { ImageInterface } from "@interfaces/frontside/ImageInterface";
import { WidgetInterface, WidgetOnPageParams, WidgetOnPageResponse } from "@interfaces/frontside/WidgetOnPageInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class WidgetOnPageMockApi {
  public index(params: WidgetOnPageParams, shouldSuccess: boolean = true): ReturnType<WidgetOnPageResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: WidgetOnPageResponse = indexResponse(params);
      returnPromise<WidgetOnPageResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(_params: WidgetOnPageParams): WidgetOnPageResponse {
  const data = [
    createWidgetBanners(1, WidgetTypeEnum.ADVERTISEMENT_GROUP),
    createWidgetBanners(2, WidgetTypeEnum.ADVERTISEMENT_MEDIUM),
    createWidgetBanners(3, WidgetTypeEnum.ADVERTISEMENT_SMALL),
    createWidgetBanners(4, WidgetTypeEnum.STORY_LIST),
    createWidgetBanners(5, WidgetTypeEnum.STORY_WINDOW),
    createWidgetBanners(6, WidgetTypeEnum.STORY_GROUP),
  ];

  return {
    data: data,
  };
}

function createWidgetBanners(sequence: number, type: WidgetTypeEnum): WidgetInterface {
  const title = randomName();
  const { bannerType, bannerNumber } = getBannerTypeAndBannerNumberFromWidgetType(type);

  return {
    id: sequence,
    sequence: sequence,
    title: title,
    type: type,
    banners: createBanners(bannerType, bannerNumber),
  };
}

function createBanners(type: BannerTypeEnum, n: number = 1): BannerInterface[] {
  const data: BannerInterface[] = [];

  for (let i = 0; i < n; i++) {
    const name = createBannerName(type);
    const title = randomName();
    const link = createBannerLink(type, title);
    const images = createImageByType(type);

    data.push({
      id: i,
      name: name,
      title: title,
      type: type,
      link: link,
      images: images,
    });
  }

  return data;
}

function randomName(min: number = 3, max: number = 5) {
  let name = faker.word.words({ count: { min: min, max: max } });
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function createBannerName(type: BannerTypeEnum) {
  if (type === BannerTypeEnum.STORY) {
    const chapterNumber = faker.number.int({ min: 1, max: 2000 });
    return `ตอนที่ ${chapterNumber}`;
  }
  return randomName();
}

function createBannerLink(type: BannerTypeEnum, title: string) {
  if (type === BannerTypeEnum.STORY || type === BannerTypeEnum.STORY_WINDOW) {
    return `/story/${title.replaceAll(" ", "-")}`;
  }
  if (type === BannerTypeEnum.CHAPTER) {
    const chapterNumber = faker.number.int({ min: 1, max: 2000 });
    return `/story/${title.replaceAll(" ", "-")}/${chapterNumber}`;
  }
  return faker.internet.url();
}

function createImageByType(type: BannerTypeEnum): ImageInterface[] {
  const images: ImageInterface[] = [];
  for (let j = 0; j < 3; j++) {
    const image = faker.image.url({ width: 750, height: 750 });
    images.push({
      id: j,
      original: image,
      desktop: image,
      mobile: image,
      thumbnail: image,
      collection_name: getCollectionNameByBannerType(type, j + 1),
    });
    if (type != BannerTypeEnum.STORY_WINDOW) {
      break;
    }
  }
  return images;
}

function getCollectionNameByBannerType(type: BannerTypeEnum, i: number = 1): CollectionEnum {
  switch (type) {
    case BannerTypeEnum.STORY:
      return CollectionEnum.BANNER_STORY;
    case BannerTypeEnum.CHAPTER:
      return CollectionEnum.BANNER_CHAPTER;
    case BannerTypeEnum.STORY_WINDOW:
      if (i == 1) {
        return CollectionEnum.BANNER_STORY_WINDOW_1;
      }
      if (i == 2) {
        return CollectionEnum.BANNER_STORY_WINDOW_2;
      }
      if (i == 3) {
        return CollectionEnum.BANNER_STORY_WINDOW_3;
      }
      return CollectionEnum.BANNER_STORY_WINDOW_1;
    case BannerTypeEnum.ADVERTISEMENT_SMALL:
      return CollectionEnum.BANNER_ADVERTISEMENT_SMALL;
    case BannerTypeEnum.ADVERTISEMENT_MEDIUM:
      return CollectionEnum.BANNER_ADVERTISEMENT_MEDIUM;
    case BannerTypeEnum.ADVERTISEMENT_GROUP:
      return CollectionEnum.BANNER_ADVERTISEMENT_GROUP;
  }
}

function getBannerTypeAndBannerNumberFromWidgetType(widgetType: WidgetTypeEnum) {
  switch (widgetType) {
    case WidgetTypeEnum.ADVERTISEMENT_GROUP:
      return { bannerType: BannerTypeEnum.ADVERTISEMENT_GROUP, bannerNumber: 4 };
    case WidgetTypeEnum.ADVERTISEMENT_MEDIUM:
      return { bannerType: BannerTypeEnum.ADVERTISEMENT_MEDIUM, bannerNumber: 4 };
    case WidgetTypeEnum.ADVERTISEMENT_SMALL:
      return { bannerType: BannerTypeEnum.ADVERTISEMENT_SMALL, bannerNumber: 4 };
    case WidgetTypeEnum.STORY_LIST:
      return { bannerType: BannerTypeEnum.STORY, bannerNumber: 7 };
    case WidgetTypeEnum.STORY_WINDOW:
      return { bannerType: BannerTypeEnum.STORY_WINDOW, bannerNumber: 7 };
    case WidgetTypeEnum.CHAPTER_GROUP:
      return { bannerType: BannerTypeEnum.CHAPTER, bannerNumber: 15 };
    case WidgetTypeEnum.STORY_GROUP:
      return { bannerType: BannerTypeEnum.STORY, bannerNumber: 15 };
  }
}

export default new WidgetOnPageMockApi();
