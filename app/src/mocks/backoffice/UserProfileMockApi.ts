import { faker } from "@faker-js/faker";

import { PermissionEnum } from "@enums/backoffice/PermissionEnum";
import { UserStatusEnum } from "@enums/backoffice/StatusEnum";
import { PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import {
  UpdateUserProfileParams,
  UpdateUserProfileResponse,
  UserProfileParams,
  UserProfileResponse,
} from "@interfaces/backoffice/UserProfileInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class UserProfileMockApi {
  public show(params: UserProfileParams, shouldSuccess: boolean = true): ReturnType<UserProfileResponse> {
    return new Promise((resolve, reject) => {
      const response: UserProfileResponse = showResponse(params);
      returnPromise<UserProfileResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateUserProfileParams, shouldSuccess: boolean = true): ReturnType<UpdateUserProfileResponse> {
    return new Promise((resolve, reject) => {
      const response: UpdateUserProfileResponse = updateResponse(params);
      returnPromise<UpdateUserProfileResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function showResponse(_params: UserProfileParams): UserProfileResponse {
  return {
    id: faker.number.int({ min: 10, max: 100 }),
    email: faker.internet.email(),
    nick_name: faker.person.middleName(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    status: UserStatusEnum.ACTIVE,
    permissions: createPermissions(),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function updateResponse(params: UpdateUserProfileParams): UpdateUserProfileResponse {
  return {
    id: params.id,
    email: params.email,
    nick_name: params.nick_name,
    first_name: params.first_name,
    last_name: params.last_name,
    status: params.status,
    permissions: createPermissions(),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createPermissions(): PermissionListInterface[] {
  const permissions: PermissionListInterface[] = [];
  const permissionNames = Object.values(PermissionEnum);
  const count = permissionNames.length;

  for (let i = 0; i < count; i++) {
    const permission = createPermission(i + 1, permissionNames[i]);
    permissions.push(permission);
  }

  return permissions;
}

function createPermission(i: number, name: string): PermissionListInterface {
  return {
    id: i,
    name: name,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

export default new UserProfileMockApi();
