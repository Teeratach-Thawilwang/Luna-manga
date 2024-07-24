import { FileUploadParams, FileUploadResponse } from "@interfaces/frontside/FileInterface";
import FileMockApi from "@mocks/frontside/FileMockApi";
import ApiClient from "@repositories/ApiClient";
import { toFormData } from "@utils/Helpers";

type ReturnType<T> = Promise<T>;

class FileApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async uploadImage(params: FileUploadParams): ReturnType<FileUploadResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return FileMockApi.uploadImage(params, true);
    }

    const formData = toFormData(params);
    return ApiClient.postFormData<FileUploadParams, FileUploadResponse>(`${this.baseUrl}/file`, formData);
  }
}

export default new FileApi();
