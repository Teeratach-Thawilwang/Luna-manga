import { faker } from "@faker-js/faker";

import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import {
  CustomerProfileParams,
  CustomerProfileResponse,
  UpdateCustomerProfileParams,
  UpdateCustomerProfileResponse,
} from "@interfaces/frontside/CustomerProfileInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class CustomerProfileMockApi {
  public getProfile(params: CustomerProfileParams, shouldSuccess: boolean = true): ReturnType<CustomerProfileResponse> {
    return new Promise((resolve, reject) => {
      const response: CustomerProfileResponse = createProfile(params);
      returnPromise<CustomerProfileResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public updateProfile(params: UpdateCustomerProfileParams, shouldSuccess: boolean = true): ReturnType<UpdateCustomerProfileResponse> {
    return new Promise((resolve, reject) => {
      const response: UpdateCustomerProfileResponse = updateProfile(params);
      returnPromise<UpdateCustomerProfileResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function createProfile(_params: CustomerProfileParams): CustomerProfileResponse {
  const image = faker.image.url({ width: 240, height: 320 });
  return {
    id: faker.number.int(100),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    nick_name: faker.person.middleName(),
    email: faker.internet.email(),
    profile_image: [
      {
        id: 1,
        original: image,
        desktop: image,
        mobile: image,
        thumbnail: image,
        collection_name: CollectionEnum.PROFILE_IMAGE,
      },
    ],
  };
}

function updateProfile(params: UpdateCustomerProfileParams): UpdateCustomerProfileResponse {
  const image = faker.image.url({ width: 240, height: 320 });
  return {
    id: faker.number.int(100),
    first_name: params.first_name,
    last_name: params.last_name,
    nick_name: params.nick_name,
    email: faker.internet.email(),
    profile_image: [
      {
        id: 1,
        original: image,
        desktop: image,
        mobile: image,
        thumbnail: image,
        collection_name: CollectionEnum.PROFILE_IMAGE,
      },
    ],
  };
}

export default new CustomerProfileMockApi();
