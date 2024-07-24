import { faker } from "@faker-js/faker";

import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { CategoryStatusEnum } from "@enums/backoffice/StatusEnum";
import {
  CategoryListInterface,
  CreateCategoryParams,
  CreateCategoryResponse,
  DeleteCategoryParams,
  DeleteCategoryResponse,
  GetCategoryListParams,
  GetCategoryListResponse,
  GetCategoryParams,
  GetCategoryResponse,
  UpdateCategoryParams,
  UpdateCategoryResponse,
} from "@interfaces/backoffice/CategoryInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class CategoryMockApi {
  public index(params: GetCategoryListParams, shouldSuccess: boolean = true): ReturnType<GetCategoryListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetCategoryListResponse = indexResponse(params);
      returnPromise<GetCategoryListResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public create(params: CreateCategoryParams, shouldSuccess: boolean = true): ReturnType<CreateCategoryResponse> {
    return new Promise((resolve, reject) => {
      const response: CreateCategoryResponse = createResponse(params);
      returnPromise<CreateCategoryResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetCategoryParams, shouldSuccess: boolean = true): ReturnType<GetCategoryResponse> {
    return new Promise((resolve, reject) => {
      const response: GetCategoryResponse = showResponse(params);
      returnPromise<GetCategoryResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateCategoryParams, shouldSuccess: boolean = true): ReturnType<UpdateCategoryResponse> {
    return new Promise((resolve, reject) => {
      const response: UpdateCategoryResponse = updateResponse(params);
      returnPromise<UpdateCategoryResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public delete(_params: DeleteCategoryParams, shouldSuccess: boolean = true): ReturnType<DeleteCategoryResponse> {
    return new Promise((resolve, reject) => {
      const response: DeleteCategoryResponse = {};
      returnPromise<DeleteCategoryResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetCategoryListParams): GetCategoryListResponse {
  const page = params.page;
  const data: CategoryListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createCategoryIndex(i);
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

function createCategoryIndex(i: number): CategoryListInterface {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    name: name,
    total_story: faker.number.int({ min: 1, max: 1000 }),
    type: randomEnum<CategoryTypeEnum>(CategoryTypeEnum),
    status: randomEnum<CategoryStatusEnum>(CategoryStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createResponse(params: CreateCategoryParams): CreateCategoryResponse {
  let imageIds: number[] = [];
  if (params.image_id != undefined) {
    imageIds = [params.image_id];
  }
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: params.name,
    type: params.type,
    status: params.status,
    images: createImages(imageIds),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function showResponse(params: GetCategoryParams): GetCategoryResponse {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: params.id,
    name: name,
    type: randomEnum<CategoryTypeEnum>(CategoryTypeEnum),
    status: randomEnum<CategoryStatusEnum>(CategoryStatusEnum),
    images: createImages([100]),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function updateResponse(params: UpdateCategoryParams): UpdateCategoryResponse {
  let imageIds: number[] = [];
  if (params.image_id != undefined) {
    imageIds = [params.image_id];
  }
  return {
    id: params.id,
    name: params.name,
    type: params.type,
    status: params.status,
    images: createImages(imageIds),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createImages(ids: number[]): ImageInterface[] {
  const data: ImageInterface[] = [];
  for (let i = 0; i < ids.length; i++) {
    data.push({
      id: ids[i],
      original: faker.image.url(),
      desktop: faker.image.url(),
      mobile: faker.image.url(),
      thumbnail: faker.image.url(),
      collection_name: CollectionEnum.CATEGORY_IMAGE,
    });
  }

  return data;
}

export default new CategoryMockApi();
