import { faker } from "@faker-js/faker";

import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
import { CollectionEnum } from "@enums/CollectionEnum";
import {
  BookmarkAddParams,
  BookmarkAddResponse,
  BookmarkDeleteParams,
  BookmarkDeleteResponse,
  BookmarkIndexParams,
  BookmarkIndexResponse,
  BookmarkStoryInterface,
} from "@interfaces/BookmarkInterface";
import { randomArray } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class BookmarkMockApi {
  public index(params: BookmarkIndexParams, shouldSuccess: boolean = true): ReturnType<BookmarkIndexResponse> {
    return new Promise((resolve, reject) => {
      const response: BookmarkIndexResponse = indexResponse(params);
      returnPromise<BookmarkIndexResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public addBookmark(_params: BookmarkAddParams, shouldSuccess: boolean = true): ReturnType<BookmarkAddResponse> {
    return new Promise((resolve, reject) => {
      const response: BookmarkAddResponse = {};
      returnPromise<BookmarkAddResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public deleteBookmark(_params: BookmarkDeleteParams, shouldSuccess: boolean = true): ReturnType<BookmarkDeleteResponse> {
    return new Promise((resolve, reject) => {
      const response: BookmarkDeleteResponse = {};
      returnPromise<BookmarkDeleteResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: BookmarkIndexParams): BookmarkIndexResponse {
  const page = params.page;
  const perPage = params.per_page;
  const data = createStories(params);
  const total = 26;
  const last = calculateLastPage(total, perPage);

  return {
    data: data,
    current: page,
    next: null,
    previous: null,
    last: last,
    total: total,
  };
}

function calculateLastPage(total: number, perPage: string | number) {
  if (typeof perPage == "number") {
    return Math.floor(total / perPage);
  }
  return 1;
}

function createStories(params: BookmarkIndexParams): BookmarkStoryInterface[] {
  const perPage = typeof params.per_page == "string" ? 26 : Number(params.per_page);
  const staterIndex = (params.page - 1) * perPage;
  const endIndex = params.page * perPage;

  const data: BookmarkStoryInterface[] = [];

  for (let i = staterIndex; i < endIndex; i++) {
    let name = faker.word.words({ count: { min: 1, max: 5 } });
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const image = faker.image.url({ width: 240, height: 320 });
    const slug = name.replaceAll(" ", "-");
    data.push({
      id: i,
      name: name,
      slug: slug,
      author: {
        id: faker.number.int({ min: 1, max: 10000 }),
        display_name: faker.person.fullName(),
      },
      rating_score: faker.number.int({ min: 1, max: 10000 }),
      view_count: faker.number.int({ min: 1, max: 1000000 }),
      type: randomArray([CategoryTypeEnum.MANGA, CategoryTypeEnum.NOVEL]),
      images: [
        {
          id: 1,
          original: image,
          desktop: image,
          mobile: image,
          thumbnail: image,
          collection_name: CollectionEnum.STORY_IMAGE,
        },
      ],
      categories: [],
    });
  }

  return data;
}

export default new BookmarkMockApi();
