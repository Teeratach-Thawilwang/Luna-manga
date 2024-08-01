import { FileUploadParams, FileUploadResponse } from "@interfaces/frontside/FileInterface";
// import FileMockApi from "@mocks/frontside/FileMockApi";
import ApiClient from "@repositories/ApiClient";
import { toFormData } from "@utils/Helpers";

type ReturnType<T> = Promise<T>;

class FileApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/FileMockApi");
      return module.default;
    }
    return null;
  }

  public async uploadImage(params: FileUploadParams): ReturnType<FileUploadResponse> {
    const FileMockApi = await this.getMockApi();
    if (FileMockApi) {
      return FileMockApi.uploadImage(params, true);
    }

    const formData = toFormData(params);
    return ApiClient.postFormData<FileUploadParams, FileUploadResponse>(`${this.baseUrl}/file`, formData);
  }
}

export default new FileApi();
