import axios, { AxiosError, AxiosRequestConfig } from "axios";

type ReturnType<T> = Promise<T>;

class ApiClient {
  private authToken: string | null;
  private headers: any;

  constructor() {
    this.authToken = null;
    this.headers = {
      "Content-Type": "application/json;charset=UTF-8",
    };
  }

  private async request<Param, Response>(url: string, method: string, data?: Param, customHeader?: any): Promise<Response> {
    const headers = { ...this.headers, ...customHeader };
    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    const config: AxiosRequestConfig = {
      method,
      url: url,
      headers: headers,
      responseType: "json",
    };
    method === "GET" && data ? (config.params = data) : (config.data = data);
    return axios(config)
      .then((response) => {
        return { ...response.data };
      })
      .catch((e: AxiosError) => {
        throw e.response;
      });
  }

  public async get<Param, Response>(url: string, data: Param): ReturnType<Response> {
    return this.request<Param, Response>(url, "GET", data);
  }

  public async postJson<Param, Response>(url: string, data: Param): ReturnType<Response> {
    return this.request<Param, Response>(url, "POST", data);
  }

  public async postFormData<_Param, Response>(url: string, formData: FormData): ReturnType<Response> {
    const header = { "Content-Type": "multipart/form-data" };
    return this.request<FormData, Response>(url, "POST", formData, header);
  }

  public async delete<Param, Response>(url: string, data: any): ReturnType<Response> {
    return this.request<Param, Response>(url, "DELETE", data);
  }

  public async put<Param, Response>(url: string, data: any): ReturnType<Response> {
    return this.request<Param, Response>(url, "PUT", data);
  }

  public setAuthToken(token: string | null): void {
    this.authToken = token;
  }
}

export default new ApiClient();
