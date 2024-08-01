import { FileUploadParams, FileUploadResponse } from "@interfaces/backoffice/FileInterface";
// import FileMockApi from "@mocks/backoffice/FileMockApi";
import ApiClient from "@repositories/ApiClient";
import { toFormData } from "@utils/Helpers";

type ReturnType<T> = Promise<T>;

class FileApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/FileMockApi");
      return module.default;
    }
    return null;
  }

  public async uploadFile(params: FileUploadParams): ReturnType<FileUploadResponse> {
    const FileMockApi = await this.getMockApi();
    if (FileMockApi) {
      return FileMockApi.uploadFile(params, true);
    }

    const formData = toFormData(params);
    return ApiClient.postFormData<FileUploadParams, FileUploadResponse>(`${this.baseUrl}/file`, formData);
  }
}

export default new FileApi();
