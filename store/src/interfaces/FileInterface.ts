import { CollectionEnum } from "@enums/CollectionEnum";

// API Design
// uploadFile [method post] : '/file'
// params FileUploadParams
// return FileUploadResponse

// APIs Parameter Interface
export interface FileUploadParams {
  file: File;
  collection_name: CollectionEnum;
}

// APIs Response Interface
export interface FileUploadResponse {
  id: number;
  uuid: string;
  file_name: string;
  mime_type: string;
  collection_name: CollectionEnum;
  conversion: any;
  created_at: string;
  updated_at: string;
}
