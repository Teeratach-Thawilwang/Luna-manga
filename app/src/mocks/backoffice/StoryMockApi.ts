import { faker } from "@faker-js/faker";

import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { CategoryStatusEnum, StoryStatusEnum } from "@enums/backoffice/StatusEnum";
import { CategoryListInterface } from "@interfaces/backoffice/CategoryInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import {
  CreateStoryParams,
  CreateStoryResponse,
  DeleteStoryParams,
  DeleteStoryResponse,
  GetStoryListParams,
  GetStoryListResponse,
  GetStoryParams,
  GetStoryResponse,
  StoryListInterface,
  UpdateStoryParams,
  UpdateStoryResponse,
} from "@interfaces/backoffice/StoryInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class StoryMockApi {
  public index(params: GetStoryListParams, shouldSuccess: boolean = true): ReturnType<GetStoryListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetStoryListResponse = indexResponse(params);
      returnPromise<GetStoryListResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public create(params: CreateStoryParams, shouldSuccess: boolean = true): ReturnType<CreateStoryResponse> {
    return new Promise((resolve, reject) => {
      const response: CreateStoryResponse = createResponse(params);
      returnPromise<CreateStoryResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetStoryParams, shouldSuccess: boolean = true): ReturnType<GetStoryResponse> {
    return new Promise((resolve, reject) => {
      const response: GetStoryResponse = showResponse(params);
      returnPromise<GetStoryResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateStoryParams, shouldSuccess: boolean = true): ReturnType<UpdateStoryResponse> {
    return new Promise((resolve, reject) => {
      const response: UpdateStoryResponse = updateResponse(params);
      returnPromise<UpdateStoryResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public delete(_params: DeleteStoryParams, shouldSuccess: boolean = true): ReturnType<DeleteStoryResponse> {
    return new Promise((resolve, reject) => {
      const response: DeleteStoryResponse = {};
      returnPromise<DeleteStoryResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetStoryListParams): GetStoryListResponse {
  const page = params.page;
  const data: StoryListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const story = createStory(i, params.type);
    data.push(story);
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

function createStory(i: number, type?: CategoryTypeEnum): StoryListInterface {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    name: name,
    type: type ?? randomEnum<CategoryTypeEnum>(CategoryTypeEnum),
    status: randomEnum<StoryStatusEnum>(StoryStatusEnum),
    total_chapter: faker.number.int({ min: 1, max: 1000 }),
    author_name: faker.person.fullName(),
    rating_score: faker.number.int({ min: 1, max: 50 }) / 10,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createResponse(params: CreateStoryParams): CreateStoryResponse {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: name,
    type: params.type,
    description: params.description,
    status: params.status,
    categories: createCategories(params.type, params.category_ids),
    cover_image: createImages([params.cover_image_id]),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function showResponse(params: GetStoryParams): GetStoryResponse {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const type = randomEnum<CategoryTypeEnum>(CategoryTypeEnum);
  return {
    id: params.id,
    name: name,
    type: type,
    description: faker.word.words({ count: { min: 5, max: 20 } }),
    status: randomEnum<StoryStatusEnum>(StoryStatusEnum),
    categories: createCategories(type, [100, 101]),
    cover_image: createImages([110]),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function updateResponse(params: UpdateStoryParams): UpdateStoryResponse {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: params.id,
    name: name,
    type: params.type,
    description: params.description,
    status: params.status,
    categories: createCategories(params.type, params.category_ids),
    cover_image: createImages([params.cover_image_id]),
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
      collection_name: CollectionEnum.STORY_IMAGE,
    });
  }

  return data;
}

function createCategories(type: CategoryTypeEnum, ids: number[]): CategoryListInterface[] {
  const data: CategoryListInterface[] = [];
  for (let i = 0; i < ids.length; i++) {
    let name = faker.word.words({ count: { min: 1, max: 3 } });
    name = name.charAt(0).toUpperCase() + name.slice(1);
    data.push({
      id: ids[i],
      name: name,
      total_story: faker.number.int({ min: 10, max: 100 }),
      type: type,
      status: randomEnum<CategoryStatusEnum>(CategoryStatusEnum),
      created_at: String(faker.date.past()),
      updated_at: String(faker.date.past()),
    });
  }

  return data;
}

export default new StoryMockApi();
