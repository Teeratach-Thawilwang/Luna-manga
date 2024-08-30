import { faker } from "@faker-js/faker";

import { CollectionEnum } from "@enums/CollectionEnum";
import {
  ChapterCommentInterface,
  ChapterCommentParams,
  ChapterCommentReactionParams,
  ChapterCommentReactionResponse,
  ChapterCommentResponse,
  CreateCommentParams,
  CreateCommentResponse,
  DeleteCommentParams,
  DeleteCommentResponse,
} from "@interfaces/ChapterCommentInterface";
import { randomArray } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class ChapterCommentMockApi {
  public index(params: ChapterCommentParams, shouldSuccess: boolean = true): ReturnType<ChapterCommentResponse> {
    return new Promise((resolve, reject) => {
      const reponse: ChapterCommentResponse = indexResponse(params);
      returnPromise<ChapterCommentResponse>(reponse, shouldSuccess, resolve, reject);
    });
  }

  public createComment(params: CreateCommentParams, shouldSuccess: boolean = true): ReturnType<CreateCommentResponse> {
    return new Promise((resolve, reject) => {
      const reponse: CreateCommentResponse = createCommentResponse(params);
      returnPromise<CreateCommentResponse>(reponse, shouldSuccess, resolve, reject);
    });
  }

  public delete(_params: DeleteCommentParams, shouldSuccess: boolean = true): ReturnType<DeleteCommentResponse> {
    return new Promise((resolve, reject) => {
      const reponse: DeleteCommentResponse = {};
      returnPromise<DeleteCommentResponse>(reponse, shouldSuccess, resolve, reject);
    });
  }

  public reaction(_params: ChapterCommentReactionParams, shouldSuccess: boolean = true): ReturnType<ChapterCommentReactionResponse> {
    return new Promise((resolve, reject) => {
      const reponse: ChapterCommentReactionResponse = createReaction();
      returnPromise<ChapterCommentReactionResponse>(reponse, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: ChapterCommentParams): ChapterCommentResponse {
  const page = params.page;
  const perPage = params.per_page;
  const data = createComments(params);
  const total = 45;
  const last = calculateLastPage(total, perPage);

  return {
    data: data,
    current: page,
    next: page < last ? page + 1 : null,
    previous: page - 1 > 0 ? page - 1 : null,
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

function createComments(params: ChapterCommentParams): ChapterCommentInterface[] {
  const page = params.page;
  const perPage = params.per_page;
  const staterIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  const data = [];

  for (let i = staterIndex; i < endIndex; i++) {
    data.push({
      id: i,
      message: faker.word.words({ count: { min: 5, max: 100 } }),
      commenter: createCommenter(),
      reaction: createReaction(),
      created_at: String(faker.date.past()),
      updated_at: String(faker.date.past()),
    });
  }

  return data;
}

function createCommentResponse(params: CreateCommentParams): CreateCommentResponse {
  return {
    id: faker.number.int({ min: 1000, max: 10000 }),
    message: params.message,
    commenter: createCommenter(params.customer_id),
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

function createCommenter(customerId?: number) {
  if (customerId == undefined) {
    customerId = faker.number.int({ min: 10, max: 1000 });
  }
  return {
    id: customerId,
    display_name: faker.person.fullName(),
    images: createCommenterImages(),
  };
}

function createCommenterImages() {
  const commenterImage = faker.image.url({ width: 100, height: 100 });
  return [
    {
      id: 1,
      original: commenterImage,
      desktop: commenterImage,
      mobile: commenterImage,
      thumbnail: commenterImage,
      collection_name: CollectionEnum.PROFILE_IMAGE,
    },
  ];
}

export default new ChapterCommentMockApi();
