import { faker } from "@faker-js/faker";

import { PermissionEnum } from "@enums/backoffice/PermissionEnum";
import { GetPermissionListParams, GetPermissionListResponse, PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class PermissionMockApi {
  public index(params: GetPermissionListParams, shouldSuccess: boolean = true): ReturnType<GetPermissionListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetPermissionListResponse = indexResponse(params);
      returnPromise<GetPermissionListResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(_params: GetPermissionListParams): GetPermissionListResponse {
  const permissions: PermissionListInterface[] = [];
  const permissionNames = Object.values(PermissionEnum);
  const count = permissionNames.length;

  for (let i = 0; i < count; i++) {
    const permission = createPermission(i + 1, permissionNames[i]);
    permissions.push(permission);
  }

  return {
    data: permissions,
  };
}

function createPermission(i: number, name: string): PermissionListInterface {
  return {
    id: i,
    name: name,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

export default new PermissionMockApi();
