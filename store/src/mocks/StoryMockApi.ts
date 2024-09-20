import { faker } from "@faker-js/faker";

import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
import { CollectionEnum } from "@enums/CollectionEnum";
// import { ContentRateEnum } from "@enums/ContentRateEnum";
import { StoryReactionParams, StoryReactionResponse, StoryShowParams, StoryShowResponse } from "@interfaces/StoryInterface";
import { randomArray } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class StoryMockApi {
  public show(params: StoryShowParams, shouldSuccess: boolean = true): ReturnType<StoryShowResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: StoryShowResponse = createStoryShow(params);
      returnPromise<StoryShowResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public reaction(params: StoryReactionParams, shouldSuccess: boolean = true): ReturnType<StoryReactionResponse> {
    return new Promise((resolve, reject) => {
      const response: StoryReactionResponse = createReaction(params);
      returnPromise<StoryReactionResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function createStoryShow(params: StoryShowParams): StoryShowResponse {
  let name = params.slug.replaceAll("-", " ");
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const image = faker.image.url({ width: 240, height: 320 });
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    slug: params.slug,
    name: name,
    // content_rate: randomArray([ContentRateEnum.ALL, ContentRateEnum.TEEN, ContentRateEnum.ADULT]),
    description: faker.word.words({ count: { min: 100, max: 150 } }),
    author: {
      id: faker.number.int({ min: 1, max: 10000 }),
      display_name: faker.person.fullName(),
    },
    view_count: faker.number.int({ min: 1, max: 1000000 }),
    reaction: createReaction(),
    type: randomArray([CategoryTypeEnum.MANGA, CategoryTypeEnum.NOVEL]),
    images: [
      {
        id: 1,
        original: image,
        desktop: image,
        // mobile: image,
        // thumbnail: image,
        collection_name: CollectionEnum.STORY_IMAGE,
      },
    ],
    categories: [],
    is_bookmark: false,
  };
}

function createReaction(params?: StoryReactionParams): StoryReactionResponse {
  let isLike = randomArray([true, false]);
  let isDislike = randomArray([true, false]);
  if (params) {
    isLike = (params?.like ?? params.like == 1) ? true : false;
    isDislike = (params?.dislike ?? params.dislike == 1) ? true : false;
  }
  return {
    like: faker.number.int({ min: 10, max: 100 }),
    dislike: faker.number.int({ min: 10, max: 100 }),
    is_liked: isLike,
    is_disliked: isDislike,
    rating_score: faker.number.int({ min: 10, max: 10000 }),
  };
}

export default new StoryMockApi();
