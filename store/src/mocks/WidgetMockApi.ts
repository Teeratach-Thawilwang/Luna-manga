import { faker } from "@faker-js/faker";

import { BannerTypeEnum } from "@enums/BannerTypeEnum";
import { CollectionEnum } from "@enums/CollectionEnum";
import { WidgetTypeEnum } from "@enums/WidgetTypeEnum";
import { BannerIndexResponseInterface, BannerInterface } from "@interfaces/BannerInterface";
import { ImageInterface } from "@interfaces/ImageInterface";
import { WidgetIndexParams, WidgetIndexResponse, WidgetsBannersParams, WidgetsBannersResponse } from "@interfaces/WidgetInterface";
import store from "@store/Store";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class WidgetMockApi {
  public index(params: WidgetIndexParams, shouldSuccess: boolean = true): ReturnType<WidgetIndexResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: WidgetIndexResponse = indexResponse(params);
      returnPromise<WidgetIndexResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public widgetBanners(params: WidgetsBannersParams, shouldSuccess: boolean = true): ReturnType<WidgetsBannersResponse> {
    return new Promise((resolve, reject) => {
      const widgetState = store.getState().widget.data.filter((widget) => widget.data.id === params.id)[0] ?? null;
      const widget = widgetState?.data;
      const widgetReponse: WidgetsBannersResponse = createWidgetBanners(params, widget!.sequence, widget!.type);
      returnPromise<WidgetsBannersResponse>(widgetReponse, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: WidgetIndexParams): WidgetIndexResponse {
  const page = params.page;
  let data: WidgetsBannersResponse[] = [];
  if (page == 1) {
    data = [
      createWidgetBanners({ id: 1, ...params }, 1, WidgetTypeEnum.ADVERTISEMENT_GROUP),
      createWidgetBanners({ id: 2, ...params }, 2, WidgetTypeEnum.STORY_LIST),
      createWidgetBanners({ id: 3, ...params }, 3, WidgetTypeEnum.STORY_LIST),
      createWidgetBanners({ id: 4, ...params }, 4, WidgetTypeEnum.CHAPTER_GROUP),
      createWidgetBanners({ id: 5, ...params }, 5, WidgetTypeEnum.ADVERTISEMENT_MEDIUM),
      createWidgetBanners({ id: 6, ...params }, 6, WidgetTypeEnum.ADVERTISEMENT_SMALL),
      createWidgetBanners({ id: 7, ...params }, 7, WidgetTypeEnum.STORY_WINDOW),
    ];
  }

  if (page > 1) {
    const sequence = page * params.per_page;
    data = [
      createWidgetBanners({ id: sequence, ...params }, sequence, WidgetTypeEnum.STORY_LIST),
      createWidgetBanners({ id: sequence + 1, ...params }, sequence + 1, WidgetTypeEnum.ADVERTISEMENT_MEDIUM),
      createWidgetBanners({ id: sequence + 2, ...params }, sequence + 2, WidgetTypeEnum.STORY_WINDOW),
      createWidgetBanners({ id: sequence + 3, ...params }, sequence + 3, WidgetTypeEnum.ADVERTISEMENT_SMALL),
    ];
  }

  return {
    data: data,
    current: page,
    next: page + 1,
    previous: page - 1 > 0 ? page - 1 : null,
    last: 5,
    total: null,
  };
}

function createWidgetBanners(params: WidgetsBannersParams, sequence: number, type: WidgetTypeEnum): WidgetsBannersResponse {
  const title = randomName();
  const { bannerType, bannerNumber } = getBannerTypeAndBannerNumberFromWidgetType(type);

  return {
    id: sequence,
    sequence: sequence,
    title: title,
    type: type,
    banners: createBanners(params, bannerType, bannerNumber),
  };
}

function createBanners(params: WidgetsBannersParams, type: BannerTypeEnum, n: number = 1): BannerIndexResponseInterface {
  const page = params.page;
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

  return {
    data: data,
    current: page,
    next: page + 1,
    previous: page - 1 > 0 ? page - 1 : null,
    last: 20,
    total: 20,
  };
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

export default new WidgetMockApi();
