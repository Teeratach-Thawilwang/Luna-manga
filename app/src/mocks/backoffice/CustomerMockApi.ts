import { faker } from "@faker-js/faker";

import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { CustomerGroupStatusEnum, CustomerStatusEnum } from "@enums/backoffice/StatusEnum";
import { CustomerGroupListInterface } from "@interfaces/backoffice/CustomerGroupInterface";
import {
  CustomerListInterface,
  GetCustomerListParams,
  GetCustomerListResponse,
  GetCustomerParams,
  GetCustomerResponse,
  UpdateCustomerParams,
  UpdateCustomerResponse,
} from "@interfaces/backoffice/CustomerInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class CustomerMockApi {
  public index(params: GetCustomerListParams, shouldSuccess: boolean = true): ReturnType<GetCustomerListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetCustomerListResponse = indexResponse(params);
      returnPromise<GetCustomerListResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetCustomerParams, shouldSuccess: boolean = true): ReturnType<GetCustomerResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetCustomerResponse = showResponse(params);
      returnPromise<GetCustomerResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateCustomerParams, shouldSuccess: boolean = true): ReturnType<UpdateCustomerResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: UpdateCustomerResponse = updateResponse(params);
      returnPromise<UpdateCustomerResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetCustomerListParams): GetCustomerListResponse {
  const page = params.page;
  const data: CustomerListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createCustomerList(i);
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

function createCustomerList(i: number): CustomerListInterface {
  return {
    id: i,
    email: faker.internet.email(),
    nick_name: faker.person.middleName(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    total_story: faker.number.int({ min: 0, max: 20 }),
    status: randomEnum<CustomerStatusEnum>(CustomerStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function showResponse(params: GetCustomerParams): GetCustomerResponse {
  return {
    id: params.id,
    email: faker.internet.email(),
    nick_name: faker.person.middleName(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    total_story: faker.number.int({ min: 0, max: 20 }),
    status: randomEnum<CustomerStatusEnum>(CustomerStatusEnum),
    profile_image: createImages([100]),
    customer_group: createCustomerGroup(),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function updateResponse(params: UpdateCustomerParams): UpdateCustomerResponse {
  return {
    id: params.id,
    email: params.email,
    nick_name: params.nick_name,
    first_name: params.first_name,
    last_name: params.last_name,
    total_story: faker.number.int({ min: 0, max: 20 }),
    status: params.status,
    profile_image: createImages([params.profile_image_id]),
    customer_group: createCustomerGroup(),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createImages(ids: number[]): ImageInterface[] {
  const data: ImageInterface[] = [];
  for (let i = 0; i < ids.length; i++) {
    data.push({
      id: ids[i],
      original: faker.image.url(),
      desktop: faker.image.url(),
      mobile: faker.image.url(),
      thumbnail: faker.image.url(),
      collection_name: CollectionEnum.PROFILE_IMAGE,
    });
  }

  return data;
}

function createCustomerGroup(): CustomerGroupListInterface {
  return {
    id: faker.number.int({ min: 0, max: 20 }),
    name: faker.person.firstName(),
    total_customer: faker.number.int({ min: 0, max: 100 }),
    status: randomEnum<CustomerGroupStatusEnum>(CustomerGroupStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

export default new CustomerMockApi();
