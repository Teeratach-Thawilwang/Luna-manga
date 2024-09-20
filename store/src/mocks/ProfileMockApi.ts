import { faker } from "@faker-js/faker";

import { CollectionEnum } from "@enums/CollectionEnum";
import { ProfileParams, ProfileResponse } from "@interfaces/ProfileInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class ProfileMockApi {
  public getProfile(params: ProfileParams, shouldSuccess: boolean = true): ReturnType<ProfileResponse> {
    return new Promise((resolve, reject) => {
      const response: ProfileResponse = createProfile(params);
      returnPromise<ProfileResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function createProfile(params: ProfileParams): ProfileResponse {
  const image = faker.image.url({ width: 240, height: 320 });
  return {
    id: params.id,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    nick_name: faker.person.middleName(),
    email: faker.internet.email(),
    profile_images: [
      {
        id: 1,
        original: image,
        desktop: image,
        // mobile: image,
        // thumbnail: image,
        collection_name: CollectionEnum.PROFILE_IMAGE,
      },
    ],
  };
}

export default new ProfileMockApi();
