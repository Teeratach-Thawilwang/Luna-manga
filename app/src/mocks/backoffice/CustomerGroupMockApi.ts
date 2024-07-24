import { faker } from "@faker-js/faker";

import { CustomerGroupStatusEnum } from "@enums/backoffice/StatusEnum";
import {
  CreateCustomerGroupParams,
  CreateCustomerGroupResponse,
  CustomerGroupListInterface,
  DeleteCustomerGroupParams,
  DeleteCustomerGroupResponse,
  GetCustomerGroupListParams,
  GetCustomerGroupListResponse,
  GetCustomerGroupParams,
  GetCustomerGroupResponse,
  UpdateCustomerGroupParams,
  UpdateCustomerGroupResponse,
} from "@interfaces/backoffice/CustomerGroupInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class CustomerGroupMockApi {
  public index(params: GetCustomerGroupListParams, shouldSuccess: boolean = true): ReturnType<GetCustomerGroupListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetCustomerGroupListResponse = indexResponse(params);
      returnPromise<GetCustomerGroupListResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public create(params: CreateCustomerGroupParams, shouldSuccess: boolean = true): ReturnType<CreateCustomerGroupResponse> {
    return new Promise((resolve, reject) => {
      const response: CreateCustomerGroupResponse = createResponse(params);
      returnPromise<CreateCustomerGroupResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetCustomerGroupParams, shouldSuccess: boolean = true): ReturnType<GetCustomerGroupResponse> {
    return new Promise((resolve, reject) => {
      const response: GetCustomerGroupResponse = showResponse(params);
      returnPromise<GetCustomerGroupResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateCustomerGroupParams, shouldSuccess: boolean = true): ReturnType<UpdateCustomerGroupResponse> {
    return new Promise((resolve, reject) => {
      const response: UpdateCustomerGroupResponse = updateResponse(params);
      returnPromise<UpdateCustomerGroupResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public delete(_params: DeleteCustomerGroupParams, shouldSuccess: boolean = true): ReturnType<DeleteCustomerGroupResponse> {
    return new Promise((resolve, reject) => {
      const response: DeleteCustomerGroupResponse = {};
      returnPromise<DeleteCustomerGroupResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetCustomerGroupListParams): GetCustomerGroupListResponse {
  const page = params.page;
  const data: CustomerGroupListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createCustomerGroupIndex(i);
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

function createCustomerGroupIndex(i: number): CustomerGroupListInterface {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    name: name,
    total_customer: faker.number.int({ min: 1, max: 1000 }),
    status: randomEnum<CustomerGroupStatusEnum>(CustomerGroupStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createResponse(params: CreateCustomerGroupParams): CreateCustomerGroupResponse {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    name: params.name,
    status: params.status,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function showResponse(params: GetCustomerGroupParams): GetCustomerGroupResponse {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: params.id,
    name: name,
    status: randomEnum<CustomerGroupStatusEnum>(CustomerGroupStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function updateResponse(params: UpdateCustomerGroupParams): UpdateCustomerGroupResponse {
  return {
    id: params.id,
    name: params.name,
    status: params.status,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

export default new CustomerGroupMockApi();
