import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { FileUploadParams, FileUploadResponse } from "@interfaces/backoffice/FileInterface";
import FileApi from "@repositories/backoffice/FileApi";
import AuthService from "@services/backoffice/AuthService";

class FileService {
  public async uploadFile(file: File, collectionName: CollectionEnum): Promise<FileUploadResponse> {
    const params: FileUploadParams = {
      file: file,
      collection_name: collectionName,
    };

    return await FileApi.uploadFile(params)
      .then((response) => {
        return response;
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            return AuthService.getTokenThenCallback(() => {
              return this.uploadFile(file, collectionName);
            });
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new FileService();
