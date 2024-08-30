import { CollectionEnum } from "@enums/CollectionEnum";
import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { FileUploadParams, FileUploadResponse } from "@interfaces/FileInterface";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import FileApi from "@repositories/FileApi";
import AuthService from "@services/AuthService";
import { navigateTo } from "@utils/Helpers";

class FileService {
  public async uploadImage(file: File, collectionName: CollectionEnum): Promise<FileUploadResponse> {
    const params: FileUploadParams = {
      file: file,
      collection_name: collectionName,
    };

    return await FileApi.uploadImage(params)
      .then((response) => {
        return response;
      })
      .catch(async (e: AxiosResponseError) => {
        console.log(e);
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            return AuthService.getTokenThenCallback(() => {
              return this.uploadImage(file, collectionName);
            });
          default:
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }
}

export default new FileService();
