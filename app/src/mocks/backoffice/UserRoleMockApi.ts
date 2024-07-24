import { faker } from "@faker-js/faker";

import { PermissionEnum } from "@enums/backoffice/PermissionEnum";
import { UserStatusEnum } from "@enums/backoffice/StatusEnum";
import { PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import { UserListInterface } from "@interfaces/backoffice/UserInterface";
import {
  CreateUserRoleParams,
  CreateUserRoleResponse,
  DeleteUserRoleParams,
  DeleteUserRoleResponse,
  GetUserRoleListParams,
  GetUserRoleListResponse,
  GetUserRoleParams,
  GetUserRoleResponse,
  UpdateUserRoleParams,
  UpdateUserRoleResponse,
  UserRoleListInterface,
} from "@interfaces/backoffice/UserRoleInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class UserRoleMockApi {
  public index(params: GetUserRoleListParams, shouldSuccess: boolean = true): ReturnType<GetUserRoleListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetUserRoleListResponse = indexResponse(params);
      returnPromise<GetUserRoleListResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public create(params: CreateUserRoleParams, shouldSuccess: boolean = true): ReturnType<CreateUserRoleResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: CreateUserRoleResponse = createResponse(params);
      returnPromise<CreateUserRoleResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetUserRoleParams, shouldSuccess: boolean = true): ReturnType<GetUserRoleResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetUserRoleResponse = showResponse(params);
      returnPromise<GetUserRoleResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateUserRoleParams, shouldSuccess: boolean = true): ReturnType<UpdateUserRoleResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: UpdateUserRoleResponse = updateResponse(params);
      returnPromise<UpdateUserRoleResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public delete(_params: DeleteUserRoleParams, shouldSuccess: boolean = true): ReturnType<DeleteUserRoleResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: DeleteUserRoleResponse = {};
      returnPromise<DeleteUserRoleResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetUserRoleListParams): GetUserRoleListResponse {
  const page = params.page;
  const data: UserRoleListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createUserRoleIndex(i);
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

function createUserRoleIndex(i: number): UserRoleListInterface {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    name: name,
    description: faker.word.words({ count: { min: 5, max: 10 } }),
    total_user: faker.number.int({ min: 1, max: 1000 }),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createResponse(params: CreateUserRoleParams): CreateUserRoleResponse {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    name: params.name,
    description: params.description,
    permissions: createPermissionList(params.permission_ids),
    users: createUserList(params.user_ids),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function showResponse(params: GetUserRoleParams): GetUserRoleResponse {
  let name = faker.word.words({ count: { min: 1, max: 4 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: params.id,
    name: name,
    description: faker.word.words({ count: { min: 1, max: 10 } }),
    permissions: createPermissionList([5, 6]),
    users: createUserList([100, 101, 102]),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function updateResponse(params: UpdateUserRoleParams): UpdateUserRoleResponse {
  return {
    id: params.id,
    name: params.name,
    description: params.description,
    permissions: createPermissionList(params.permission_ids),
    users: createUserList(params.user_ids),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createPermissionList(ids: number[]): PermissionListInterface[] {
  const permissions: PermissionListInterface[] = [];
  const permissionNames = Object.values(PermissionEnum);
  const count = permissionNames.length;

  for (let i = 0; i < count; i++) {
    const permission = createPermission(i + 1, permissionNames[i]);
    permissions.push(permission);
  }

  return permissions.filter((permission) => ids.includes(permission.id));
}

function createPermission(i: number, name: string): PermissionListInterface {
  return {
    id: i,
    name: name,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createUserList(ids: number[]): UserListInterface[] {
  return ids.map((id) => {
    return {
      id: id,
      email: faker.internet.email(),
      nick_name: faker.person.middleName(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      status: randomEnum<UserStatusEnum>(UserStatusEnum),
      created_at: String(faker.date.past()),
      updated_at: String(faker.date.past()),
    };
  });
}

export default new UserRoleMockApi();
