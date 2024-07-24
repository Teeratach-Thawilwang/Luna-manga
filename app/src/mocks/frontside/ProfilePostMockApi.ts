import { faker } from "@faker-js/faker";

import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import {
  CreateProfilePostParams,
  CreateProfilePostResponse,
  DeletePostParams,
  DeletePostResponse,
  ProfilePostInterface,
  ProfilePostParams,
  ProfilePostReactionParams,
  ProfilePostReactionResponse,
  ProfilePostResponse,
} from "@interfaces/frontside/ProfilePostInterface";
import { randomArray } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class ProfilePostMockApi {
  public index(params: ProfilePostParams, shouldSuccess: boolean = true): ReturnType<ProfilePostResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const reponse: ProfilePostResponse = indexResponse(params);
      returnPromise<ProfilePostResponse>(reponse, shouldSuccess, resolve, reject);
    });
  }

  public createPost(params: CreateProfilePostParams, shouldSuccess: boolean = true): ReturnType<CreateProfilePostResponse> {
    return new Promise((resolve, reject) => {
      const reponse: CreateProfilePostResponse = createPostResponse(params);
      returnPromise<CreateProfilePostResponse>(reponse, shouldSuccess, resolve, reject);
    });
  }

  public delete(_params: DeletePostParams, shouldSuccess: boolean = true): ReturnType<DeletePostResponse> {
    return new Promise((resolve, reject) => {
      const reponse: DeletePostResponse = {};
      returnPromise<DeletePostResponse>(reponse, shouldSuccess, resolve, reject);
    });
  }

  public reaction(_params: ProfilePostReactionParams, shouldSuccess: boolean = true): ReturnType<ProfilePostReactionResponse> {
    return new Promise((resolve, reject) => {
      const reponse: ProfilePostReactionResponse = createReaction();
      returnPromise<ProfilePostReactionResponse>(reponse, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: ProfilePostParams): ProfilePostResponse {
  const { page } = params;
  const data = createPosts(params);

  return {
    data: data,
    current: page,
    next: page < 3 ? page + 1 : null,
    previous: page - 1 > 0 ? page - 1 : null,
    last: 1,
    total: 45,
  };
}

function createPosts(params: ProfilePostParams): ProfilePostInterface[] {
  const { page, per_page } = params;
  const staterIndex = (page - 1) * per_page;
  const endIndex = page * per_page;
  const data = [];

  for (let i = staterIndex; i < endIndex; i++) {
    const commenterImage = faker.image.url({ width: 100, height: 100 });
    const commenter = {
      id: params.customer_id,
      display_name: faker.person.fullName(),
      images: [
        {
          id: 1,
          original: commenterImage,
          desktop: commenterImage,
          mobile: commenterImage,
          thumbnail: commenterImage,
          collection_name: CollectionEnum.PROFILE_IMAGE,
        },
      ],
    };
    data.push({
      id: i,
      commenter: commenter,
      message: faker.word.words({ count: { min: 5, max: 100 } }),
      reaction: createReaction(),
      created_at: String(faker.date.past()),
      updated_at: String(faker.date.past()),
    });
  }

  return data;
}

function createPostResponse(params: CreateProfilePostParams): CreateProfilePostResponse {
  const commenterImage = faker.image.url({ width: 100, height: 100 });
  const commenter = {
    id: params.customer_id,
    display_name: faker.person.fullName(),
    images: [
      {
        id: 1,
        original: commenterImage,
        desktop: commenterImage,
        mobile: commenterImage,
        thumbnail: commenterImage,
        collection_name: CollectionEnum.PROFILE_IMAGE,
      },
    ],
  };

  return {
    id: faker.number.int({ min: 10, max: 1000 }),
    message: params.message,
    commenter: commenter,
    reaction: createReaction(),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createReaction() {
  return {
    like: faker.number.int({ min: 10, max: 100 }),
    dislike: faker.number.int({ min: 10, max: 100 }),
    is_liked: randomArray([true, false]),
    is_disliked: randomArray([true, false]),
  };
}

export default new ProfilePostMockApi();
