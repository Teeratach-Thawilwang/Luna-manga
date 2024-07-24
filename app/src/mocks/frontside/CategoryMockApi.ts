import { faker } from "@faker-js/faker";

import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import { CategoryIndexParams, CategoryIndexResponse, CategoryInterface } from "@interfaces/frontside/CategoryInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class CategoryMockApi {
  public index(params: CategoryIndexParams, shouldSuccess: boolean = true): ReturnType<CategoryIndexResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: CategoryIndexResponse = indexResponse(params);
      returnPromise<CategoryIndexResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: CategoryIndexParams): CategoryIndexResponse {
  const page = params.page;
  const data = [createCategories(CategoryTypeEnum.MANGA, 8), createCategories(CategoryTypeEnum.NOVEL, 8)].flat();
  data.map((category, key) => (category.id = key));

  let paginate = {
    current: page,
    next: null,
    previous: null,
    last: null,
    total: 8,
  };
  return {
    data: data,
    ...paginate,
  };
}

function createCategories(type: CategoryTypeEnum, n: number = 1): CategoryInterface[] {
  const data: CategoryInterface[] = [];
  for (let i = 0; i < n; i++) {
    let name = faker.word.words({ count: { min: 1, max: 3 } });
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const slug = name.replaceAll(" ", "-");

    data.push({
      id: i,
      name: name,
      slug: slug,
      type: type,
      images: [
        {
          id: 0,
          original: faker.image.url(),
          desktop: faker.image.url(),
          mobile: faker.image.url(),
          thumbnail: faker.image.url(),
          collection_name: CollectionEnum.CATEGORY_IMAGE,
        },
      ],
    });
  }

  return data;
}

export default new CategoryMockApi();
