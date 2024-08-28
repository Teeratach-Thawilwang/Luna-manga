import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { RefreshTokenParams, RefreshTokenResponse } from "@interfaces/backoffice/AuthInterface";
import CookieService from "@services/backoffice/CookieService";

type ReturnType<T> = Promise<T>;

class ApiClient {
  private authToken: string | null = null;
  private axiosInstance: AxiosInstance;
  private baseURL: string = import.meta.env.VITE_BACKOFFICE_API_URL;

  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];
  private refreshTokenUrl = `${import.meta.env.VITE_BACKOFFICE_API_URL}/session-refresh`;

  constructor() {
    this.axiosInstance = this.createClient();
    this.axiosInstance.interceptors.request.use(this.preRequestHandler.bind(this), (error) => Promise.reject(error));
    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => response, this.responseErrorHandler.bind(this));
  }

  private createClient() {
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      responseType: "json",
    });
  }

  private preRequestHandler(config: InternalAxiosRequestConfig) {
    const token = CookieService.getAccessToken();
    if (token != undefined) {
      this.authToken = token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }

  private async responseErrorHandler(error: AxiosError) {
    const originalRequest = error.config as InternalAxiosRequestConfig & { isRetry?: boolean };
    const isNotRetry = !originalRequest.isRetry;

    const response = error.response as AxiosResponseError;
    const isErrorInData = response?.data != undefined && "error" in response.data;
    const isTokenExpired = isErrorInData && response.data.error == ResponseErrorEnum.TOKEN_EXPIRED;

    if (isNotRetry && isTokenExpired) {
      return await this.tokenExpiredHandler(originalRequest);
    }

    return Promise.reject(error);
  }

  private async tokenExpiredHandler(originalRequest: InternalAxiosRequestConfig & { isRetry?: boolean }) {
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshSubscribers.push((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          resolve(this.axiosInstance(originalRequest));
        });
      });
    }

    originalRequest.isRetry = true;
    this.isRefreshing = true;

    try {
      const params: RefreshTokenParams = {
        client_id: import.meta.env.VITE_BACKOFFICE_CLIENT_ID,
        refresh_token: CookieService.getRefreshToken()!,
      };
      const { data }: { data: RefreshTokenResponse } = await axios.post(this.refreshTokenUrl, params);
      CookieService.setAccessToken(data.access_token, data.access_token_expired_day);
      CookieService.setRefreshToken(data.refresh_token, data.refresh_token_expired_day);

      this.authToken = data.access_token;
      this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${this.authToken}`;
      this.isRefreshing = false;
      this.refreshSubscribers.forEach((callback) => callback(data.access_token));
      this.refreshSubscribers = [];

      return this.axiosInstance(originalRequest);
    } catch (error) {
      this.isRefreshing = false;
      this.refreshSubscribers = [];
      return Promise.reject(error);
    }
  }

  private async request<Param, Response>(url: string, method: string, data?: Param, customHeader?: any): ReturnType<Response> {
    const config: AxiosRequestConfig = {
      method,
      url: url,
      headers: { ...this.axiosInstance.defaults.headers, ...customHeader },
      responseType: "json",
    };
    if (method === "GET" && data) {
      config.params = data;
    } else if (data) {
      config.data = data;
    }

    return this.axiosInstance(config)
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        throw error.response;
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

  public async delete<Param, Response>(url: string, data: Param): ReturnType<Response> {
    return this.request<Param, Response>(url, "DELETE", data);
  }

  public async put<Param, Response>(url: string, data: Param): ReturnType<Response> {
    return this.request<Param, Response>(url, "PUT", data);
  }

  public setAuthToken(token: string): void {
    this.authToken = token;
    if (token) {
      this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers["Authorization"];
    }
  }
}

export default new ApiClient();
