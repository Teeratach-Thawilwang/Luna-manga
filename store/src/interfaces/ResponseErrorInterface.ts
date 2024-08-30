import { AxiosResponse } from "axios";

export interface ResponseErrorInterface {
  error: string;
  message?: string;
  messages?: any[];
}

export type AxiosResponseError = AxiosResponse<ResponseErrorInterface>;
