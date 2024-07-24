import { faker } from "@faker-js/faker";

import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import { StoryChapterInterface, StoryChapterParams, StoryChapterResponse } from "@interfaces/frontside/StoryChapterInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class StoryChapterMockApi {
  public index(params: StoryChapterParams, shouldSuccess: boolean = true): ReturnType<StoryChapterResponse> {
    return new Promise((resolve, reject) => {
      const response: StoryChapterResponse = indexResponse(params);
      returnPromise<StoryChapterResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: StoryChapterParams): StoryChapterResponse {
  const page = params.page;
  const perPage = params.per_page;
  const total = 98;
  const data: StoryChapterInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createChapter(i);
    data.push(chapter);
  }

  return {
    data: data,
    current: page,
    next: null,
    previous: null,
    last: Math.floor(total / perPage),
    total: total,
  };
}

function createChapter(i: number): StoryChapterInterface {
  const name = randomName();
  return {
    id: i,
    chapter_number: i,
    name: `ตอนที่ ${i} - ${name}`,
    score: faker.number.int({ min: 1, max: 10000 }),
    view_count: faker.number.int({ min: 1, max: 1000000 }),
    release_date: String(faker.date.future()),
    cover_images: [createImage()],
  };
}

function randomName(min: number = 3, max: number = 5) {
  let name = faker.word.words({ count: { min: min, max: max } });
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function createImage(width: number = 100, height: number = 100) {
  const image = faker.image.url({ width: width, height: height });
  return {
    id: 0,
    original: image,
    desktop: image,
    mobile: image,
    thumbnail: image,
    collection_name: CollectionEnum.STORY_IMAGE,
  };
}

export default new StoryChapterMockApi();
