import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { FileUploadParams, FileUploadResponse } from "@interfaces/frontside/FileInterface";
import FileApi from "@repositories/frontside/FileApi";
import AuthService from "@services/frontside/AuthService";
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
