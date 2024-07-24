import { faker } from "@faker-js/faker";

import { FileUploadParams, FileUploadResponse } from "@interfaces/frontside/FileInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class FileMockApi {
  public uploadImage(params: FileUploadParams, shouldSuccess: boolean = true): ReturnType<FileUploadResponse> {
    return new Promise((resolve, reject) => {
      const response: FileUploadResponse = createUploadImageResponse(params);
      returnPromise<FileUploadResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function createUploadImageResponse(params: FileUploadParams): FileUploadResponse {
  return {
    id: faker.number.int({ min: 10, max: 100 }),
    uuid: faker.string.uuid(),
    file_name: faker.string.alpha(),
    mime_type: params.file.type,
    collection_name: params.collection_name,
    conversion: {},
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

export default new FileMockApi();
