import { faker } from "@faker-js/faker";

import { UserStatusEnum } from "@enums/backoffice/StatusEnum";
import {
  CreateUserParams,
  CreateUserResponse,
  GetUserListParams,
  GetUserListResponse,
  GetUserParams,
  GetUserResponse,
  UpdateUserParams,
  UpdateUserResponse,
  UserListInterface,
} from "@interfaces/backoffice/UserInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class UserMockApi {
  public index(params: GetUserListParams, shouldSuccess: boolean = true): ReturnType<GetUserListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetUserListResponse = indexResponse(params);
      returnPromise<GetUserListResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public create(params: CreateUserParams, shouldSuccess: boolean = true): ReturnType<CreateUserResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: CreateUserResponse = createResponse(params);
      returnPromise<CreateUserResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetUserParams, shouldSuccess: boolean = true): ReturnType<GetUserResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetUserResponse = showResponse(params);
      returnPromise<GetUserResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateUserParams, shouldSuccess: boolean = true): ReturnType<UpdateUserResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: UpdateUserResponse = updateResponse(params);
      returnPromise<UpdateUserResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetUserListParams): GetUserListResponse {
  const page = params.page;
  const data: UserListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createUserIndex(i);
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

function createUserIndex(i: number): UserListInterface {
  return {
    id: i,
    email: faker.internet.email(),
    nick_name: faker.person.middleName(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    status: randomEnum<UserStatusEnum>(UserStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createResponse(params: CreateUserParams): CreateUserResponse {
  return {
    id: faker.number.int({ min: 10, max: 100 }),
    email: params.email,
    nick_name: params.nick_name,
    first_name: params.first_name,
    last_name: params.last_name,
    status: params.status,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function showResponse(params: GetUserParams): GetUserResponse {
  return {
    id: params.id,
    email: faker.internet.email(),
    nick_name: faker.person.middleName(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    status: randomEnum<UserStatusEnum>(UserStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function updateResponse(params: UpdateUserParams): UpdateUserResponse {
  return {
    id: params.id,
    email: params.email,
    nick_name: params.nick_name,
    first_name: params.first_name,
    last_name: params.last_name,
    status: params.status,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

export default new UserMockApi();
