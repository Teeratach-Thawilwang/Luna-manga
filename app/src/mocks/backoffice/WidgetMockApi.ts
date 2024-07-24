import { faker } from "@faker-js/faker";

import { BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import { BannerStatusEnum, WidgetStatusEnum } from "@enums/backoffice/StatusEnum";
import { WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";
import { BannerListInterface } from "@interfaces/backoffice/BannerInterface";
import {
  CreateWidgetParams,
  CreateWidgetResponse,
  DeleteWidgetParams,
  DeleteWidgetResponse,
  GetWidgetListParams,
  GetWidgetListResponse,
  GetWidgetParams,
  GetWidgetResponse,
  UpdateWidgetParams,
  UpdateWidgetResponse,
  WidgetListInterface,
} from "@interfaces/backoffice/WidgetInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class WidgetMockApi {
  public index(params: GetWidgetListParams, shouldSuccess: boolean = true): ReturnType<GetWidgetListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetWidgetListResponse = indexResponse(params);
      returnPromise<GetWidgetListResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public create(params: CreateWidgetParams, shouldSuccess: boolean = true): ReturnType<CreateWidgetResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: CreateWidgetResponse = createResponse(params);
      returnPromise<CreateWidgetResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetWidgetParams, shouldSuccess: boolean = true): ReturnType<GetWidgetResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetWidgetResponse = showResponse(params);
      returnPromise<GetWidgetResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateWidgetParams, shouldSuccess: boolean = true): ReturnType<UpdateWidgetResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: UpdateWidgetResponse = updateResponse(params);
      returnPromise<UpdateWidgetResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public delete(_params: DeleteWidgetParams, shouldSuccess: boolean = true): ReturnType<DeleteWidgetResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: DeleteWidgetResponse = {};
      returnPromise<DeleteWidgetResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetWidgetListParams): GetWidgetListResponse {
  const page = params.page;
  const data: WidgetListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createWidgetIndex(i, params.type ?? null);
    data.push(chapter);
  }

  return {
    data: data,
    current: page,
    next: page + 1,
    previous: page - 1 > 0 ? page - 1 : null,
    last: null,
    total: null,
  };
}

function createWidgetIndex(i: number, type: WidgetTypeEnum | null): WidgetListInterface {
  let name = faker.word.words({ count: { min: 1, max: 5 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    name: name,
    total_banner: faker.number.int({ min: 2, max: 10 }),
    type: type ?? randomEnum<WidgetTypeEnum>(WidgetTypeEnum),
    status: randomEnum<WidgetStatusEnum>(WidgetStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createResponse(params: CreateWidgetParams): CreateWidgetResponse {
  return {
    id: faker.number.int({ min: 10, max: 100 }),
    name: params.name,
    title: params.title,
    type: params.type,
    status: params.status,
    banners: createBanners(params.type),
  };
}

function showResponse(params: GetWidgetParams): GetWidgetResponse {
  const type = randomEnum<WidgetTypeEnum>(WidgetTypeEnum);
  return {
    id: params.id,
    name: faker.word.words({ count: { min: 3, max: 8 } }),
    title: faker.word.words({ count: { min: 3, max: 8 } }),
    type: randomEnum<WidgetTypeEnum>(WidgetTypeEnum),
    status: randomEnum<WidgetStatusEnum>(WidgetStatusEnum),
    banners: createBanners(type),
  };
}

function updateResponse(params: UpdateWidgetParams): UpdateWidgetResponse {
  return {
    id: params.id,
    name: params.name,
    title: params.title,
    type: params.type,
    status: params.status,
    banners: createBanners(params.type),
  };
}

function createBanners(type: WidgetTypeEnum): BannerListInterface[] {
  let name = faker.word.words({ count: { min: 1, max: 5 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);

  const data: BannerListInterface[] = [];
  const count = faker.number.int({ min: 1, max: 5 });

  for (let i = 0; i < count; i++) {
    data.push({
      id: faker.number.int({ min: 10, max: 100 }),
      name: name,
      type: getBannerTypeFromWidgetType(type),
      status: randomEnum<BannerStatusEnum>(BannerStatusEnum),
      created_at: String(faker.date.past()),
      updated_at: String(faker.date.past()),
    });
  }

  return data;
}

function getBannerTypeFromWidgetType(type: WidgetTypeEnum): BannerTypeEnum {
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
  }
}

export default new WidgetMockApi();
