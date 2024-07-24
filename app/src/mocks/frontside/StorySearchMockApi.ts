import { faker } from "@faker-js/faker";

import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import { StorySearchInterface, StorySearchParams, StorySearchResponse } from "@interfaces/frontside/StorySearchInterface";
import { randomArray } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class StorySearchMockApi {
  public search(params: StorySearchParams, shouldSuccess: boolean = true): ReturnType<StorySearchResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: StorySearchResponse = searchResponse(params);
      returnPromise<StorySearchResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

const storyNameList = ["One Piece", "Naruto", "Beach", "Conan", "Doraemon", "Dragonball", "Dragonball Z", "Dragonball Super", "Dragonball GT"];

function searchResponse(params: StorySearchParams): StorySearchResponse {
  const storySearchFiltered = storyNameList.filter((name) => {
    const pattern = new RegExp(`^${params.q}`, "i");
    return !!name.match(pattern);
  });

  const storyFiltered = storySearchFiltered.filter((_name, key) => {
    if (params.per_page) {
      return key < params.per_page;
    }
    return true;
  });

  if (storyFiltered.length == 0) {
    return {
      data: [],
    };
  }

  const data = storyFiltered.map((name) => {
    return createStorySearch(name);
  });

  return {
    data: data,
  };
}

function createStorySearch(name: string): StorySearchInterface {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    slug: name.replaceAll(" ", "-"),
    name: name,
    type: randomArray([CategoryTypeEnum.MANGA, CategoryTypeEnum.NOVEL]),
    author: {
      id: faker.number.int({ min: 1, max: 10000 }),
      display_name: faker.person.fullName(),
    },
    rating_score: faker.number.int({ min: 1, max: 10000 }),
    view_count: faker.number.int({ min: 1, max: 1000000 }),
    images: createImages(),
    categories: createCategories(),
  };
}

function createImages(width: number = 240, height: number = 320) {
  const image = faker.image.url({ width: width, height: height });
  return [
    {
      id: 1,
      original: image,
      desktop: image,
      mobile: image,
      thumbnail: image,
      collection_name: CollectionEnum.STORY_IMAGE,
    },
  ];
}

function createCategories() {
  const name = faker.word.words({ count: { min: 5, max: 10 } });
  return [
    {
      id: faker.number.int({ min: 1, max: 10000 }),
      slug: name.replaceAll("-", " "),
      name: name,
      type: randomArray([CategoryTypeEnum.MANGA, CategoryTypeEnum.NOVEL]),
      images: createImages(240, 240),
    },
  ];
}

export default new StorySearchMockApi();
