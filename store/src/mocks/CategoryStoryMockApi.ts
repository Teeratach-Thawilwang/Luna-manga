import { faker } from "@faker-js/faker";

import { CollectionEnum } from "@enums/CollectionEnum";
// import { ContentRateEnum } from "@enums/ContentRateEnum";
import { CategoryStoryIndexParams, CategoryStoryIndexResponse, CategoryStoryInterface } from "@interfaces/CategoryStoryInterface";
import store from "@store/Store";
// import { randomArray } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class CategoryStoryMockApi {
  public index(params: CategoryStoryIndexParams, shouldSuccess: boolean = true): ReturnType<CategoryStoryIndexResponse> {
    return new Promise((resolve, reject) => {
      const response: CategoryStoryIndexResponse = indexResponse(params);
      returnPromise<CategoryStoryIndexResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: CategoryStoryIndexParams): CategoryStoryIndexResponse {
  const page = params.page;
  const perPage = params.per_page;
  const data = createStories(params);
  const total = 50;
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

function createStories(params: CategoryStoryIndexParams): CategoryStoryInterface[] {
  const staterIndex = (params.page - 1) * params.per_page;
  const endIndex = params.page * params.per_page;

  const data: CategoryStoryInterface[] = [];
  const category = store.getState().category.data.filter((category) => category.id === params.id)[0] ?? null;

  for (let i = staterIndex; i < endIndex; i++) {
    let name = faker.word.words({ count: { min: 1, max: 5 } });
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const slug = name.replaceAll(" ", "-");
    data.push({
      id: i,
      slug: slug,
      name: name,
      // content_rate: randomArray([ContentRateEnum.ALL, ContentRateEnum.ADULT, ContentRateEnum.TEEN]),
      type: category.type,
      author: {
        id: faker.number.int({ min: 1, max: 10000 }),
        display_name: faker.person.fullName(),
      },
      rating_score: faker.number.int({ min: 1, max: 10000 }),
      view_count: faker.number.int({ min: 1, max: 1000000 }),
      images: [
        {
          id: 0,
          original: faker.image.url(),
          desktop: faker.image.url(),
          mobile: faker.image.url(),
          thumbnail: faker.image.url(),
          collection_name: CollectionEnum.STORY_IMAGE,
        },
      ],
    });
  }

  return data;
}

export default new CategoryStoryMockApi();
