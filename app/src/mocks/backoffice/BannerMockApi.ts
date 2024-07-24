import { faker } from "@faker-js/faker";

import { BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { BannerStatusEnum, ChapterStatusEnum, StoryStatusEnum } from "@enums/backoffice/StatusEnum";
import {
  BannerListInterface,
  CreateBannerParams,
  CreateBannerResponse,
  DeleteBannerParams,
  DeleteBannerResponse,
  GetBannerListParams,
  GetBannerListResponse,
  GetBannerParams,
  GetBannerResponse,
  UpdateBannerParams,
  UpdateBannerResponse,
} from "@interfaces/backoffice/BannerInterface";
import { ChapterListInterface } from "@interfaces/backoffice/ChapterInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { StoryListInterface } from "@interfaces/backoffice/StoryInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class BannerMockApi {
  public index(params: GetBannerListParams, shouldSuccess: boolean = true): ReturnType<GetBannerListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetBannerListResponse = indexResponse(params);
      returnPromise<GetBannerListResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public create(params: CreateBannerParams, shouldSuccess: boolean = true): ReturnType<CreateBannerResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: CreateBannerResponse = createResponse(params);
      returnPromise<CreateBannerResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetBannerParams, shouldSuccess: boolean = true): ReturnType<GetBannerResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetBannerResponse = showResponse(params);
      returnPromise<GetBannerResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateBannerParams, shouldSuccess: boolean = true): ReturnType<UpdateBannerResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: UpdateBannerResponse = updateResponse(params);
      returnPromise<UpdateBannerResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public delete(_params: DeleteBannerParams, shouldSuccess: boolean = true): ReturnType<DeleteBannerResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: DeleteBannerResponse = {};
      returnPromise<DeleteBannerResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetBannerListParams): GetBannerListResponse {
  const page = params.page;
  const data: BannerListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createBannerIndex(i, params.type ?? null);
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

function createBannerIndex(i: number, type: BannerTypeEnum | null): BannerListInterface {
  let name = faker.word.words({ count: { min: 1, max: 5 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    id: i,
    name: name,
    type: type ?? randomEnum<BannerTypeEnum>(BannerTypeEnum),
    status: randomEnum<BannerStatusEnum>(BannerStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createResponse(params: CreateBannerParams): CreateBannerResponse {
  const categoryType = randomEnum<CategoryTypeEnum>(CategoryTypeEnum);
  let story = null;
  let chapter = null;
  let images = [];
  if (params.type == BannerTypeEnum.STORY) {
    story = createStory(params.story_id!, categoryType);
  }
  if (params.type == BannerTypeEnum.CHAPTER) {
    chapter = createChapter(params.chapter_id!, categoryType);
  }
  if (params.type == BannerTypeEnum.STORY_WINDOW) {
    images.push(createImage(100, CollectionEnum.BANNER_STORY_WINDOW_1));
    images.push(createImage(101, CollectionEnum.BANNER_STORY_WINDOW_2));
    images.push(createImage(102, CollectionEnum.BANNER_STORY_WINDOW_3));
  }
  if (params.type == BannerTypeEnum.ADVERTISEMENT_SMALL) {
    images.push(createImage(100, CollectionEnum.BANNER_ADVERTISEMENT_SMALL));
  }
  if (params.type == BannerTypeEnum.ADVERTISEMENT_MEDIUM) {
    images.push(createImage(100, CollectionEnum.BANNER_ADVERTISEMENT_MEDIUM));
  }
  if (params.type == BannerTypeEnum.ADVERTISEMENT_GROUP) {
    images.push(createImage(100, CollectionEnum.BANNER_ADVERTISEMENT_GROUP));
  }

  return {
    id: faker.number.int({ min: 10, max: 100 }),
    name: params.name,
    title: params.title,
    type: params.type,
    link: params.link,
    status: params.status,
    story: story,
    chapter: chapter,
    images: images,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function showResponse(params: GetBannerParams): GetBannerResponse {
  const bannerType = randomEnum<BannerTypeEnum>(BannerTypeEnum);
  const categoryType = randomEnum<CategoryTypeEnum>(CategoryTypeEnum);
  let story = null;
  let chapter = null;
  let images = [];

  if (bannerType == BannerTypeEnum.STORY) {
    story = createStory(100, categoryType);
  }
  if (bannerType == BannerTypeEnum.CHAPTER) {
    chapter = createChapter(101, categoryType);
  }
  if (bannerType == BannerTypeEnum.STORY_WINDOW) {
    images.push(createImage(100, CollectionEnum.BANNER_STORY_WINDOW_1));
    images.push(createImage(101, CollectionEnum.BANNER_STORY_WINDOW_2));
    images.push(createImage(102, CollectionEnum.BANNER_STORY_WINDOW_3));
  }
  if (bannerType == BannerTypeEnum.ADVERTISEMENT_SMALL) {
    images.push(createImage(100, CollectionEnum.BANNER_ADVERTISEMENT_SMALL));
  }
  if (bannerType == BannerTypeEnum.ADVERTISEMENT_MEDIUM) {
    images.push(createImage(100, CollectionEnum.BANNER_ADVERTISEMENT_MEDIUM));
  }
  if (bannerType == BannerTypeEnum.ADVERTISEMENT_GROUP) {
    images.push(createImage(100, CollectionEnum.BANNER_ADVERTISEMENT_GROUP));
  }

  return {
    id: params.id,
    name: faker.word.words({ count: 5 }),
    title: faker.word.words({ count: 5 }),
    type: bannerType,
    link: faker.internet.url(),
    status: randomEnum<BannerStatusEnum>(BannerStatusEnum),
    story: story,
    chapter: chapter,
    images: images,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function updateResponse(params: UpdateBannerParams): UpdateBannerResponse {
  const categoryType = randomEnum<CategoryTypeEnum>(CategoryTypeEnum);
  let story = null;
  let chapter = null;
  let images = [];
  if (params.type == BannerTypeEnum.STORY) {
    story = createStory(params.story_id!, categoryType);
  }
  if (params.type == BannerTypeEnum.CHAPTER) {
    chapter = createChapter(params.chapter_id!, categoryType);
  }
  if (params.type == BannerTypeEnum.STORY_WINDOW) {
    images.push(createImage(100, CollectionEnum.BANNER_STORY_WINDOW_1));
    images.push(createImage(101, CollectionEnum.BANNER_STORY_WINDOW_2));
    images.push(createImage(102, CollectionEnum.BANNER_STORY_WINDOW_3));
  }
  if (params.type == BannerTypeEnum.ADVERTISEMENT_SMALL) {
    images.push(createImage(100, CollectionEnum.BANNER_ADVERTISEMENT_SMALL));
  }
  if (params.type == BannerTypeEnum.ADVERTISEMENT_MEDIUM) {
    images.push(createImage(100, CollectionEnum.BANNER_ADVERTISEMENT_MEDIUM));
  }
  if (params.type == BannerTypeEnum.ADVERTISEMENT_GROUP) {
    images.push(createImage(100, CollectionEnum.BANNER_ADVERTISEMENT_GROUP));
  }

  return {
    id: params.id,
    name: params.name,
    title: params.title,
    type: params.type,
    link: params.link,
    status: params.status,
    story: story,
    chapter: chapter,
    images: images,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createStory(i: number, type: CategoryTypeEnum): StoryListInterface {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    name: name,
    type: type,
    status: randomEnum<StoryStatusEnum>(StoryStatusEnum),
    author_name: faker.person.fullName(),
    total_chapter: faker.number.int({ min: 1, max: 1000 }),
    rating_score: faker.number.int({ min: 1, max: 50 }) / 10,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createChapter(i: number, type: CategoryTypeEnum): ChapterListInterface {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    story_id: faker.number.int({ min: 1, max: 1000 }),
    name: name,
    chapter_number: i,
    score: faker.number.int({ min: 1, max: 50 }) / 10,
    view_count: faker.number.int({ min: 1, max: 1000 }),
    type: type,
    status: randomEnum<ChapterStatusEnum>(ChapterStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createImage(id: number, collection: CollectionEnum): ImageInterface {
  return {
    id: id,
    original: faker.image.url(),
    desktop: faker.image.url(),
    mobile: faker.image.url(),
    thumbnail: faker.image.url(),
    collection_name: collection,
  };
}

export default new BannerMockApi();
