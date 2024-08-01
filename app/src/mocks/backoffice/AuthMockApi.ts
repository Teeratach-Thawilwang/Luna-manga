import { faker } from "@faker-js/faker";

import { ResponseErrorInterface } from "@interfaces/ResponseErrorInterface";
import {
  LogoutParams,
  LogoutResponse,
  RefreshTokenParams,
  RefreshTokenResponse,
  SessionTokenParams,
  SessionTokenResponse,
} from "@interfaces/backoffice/AuthInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class AuthMockApi {
  public sessionToken(params: SessionTokenParams, _shouldSuccess: boolean = true): ReturnType<SessionTokenResponse> {
    return new Promise((resolve, reject) => {
      const { shouldSuccess, response } = sessionHandle(params);

      if (shouldSuccess) {
        returnPromise<SessionTokenResponse>(response as SessionTokenResponse, shouldSuccess, resolve, reject);
      }

      returnPromise<SessionTokenResponse>(createToken(), shouldSuccess, resolve, reject, response as ResponseErrorInterface);
    });
  }

  public refreshToken(_params: RefreshTokenParams, shouldSuccess: boolean = true): ReturnType<RefreshTokenResponse> {
    return new Promise((resolve, reject) => {
      const response: RefreshTokenResponse = createToken();
      returnPromise<RefreshTokenResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public logout(_params: LogoutParams, shouldSuccess: boolean = true): ReturnType<LogoutResponse> {
    return new Promise((resolve, reject) => {
      const response: LogoutResponse = {};
      returnPromise<LogoutResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function createToken() {
  return {
    access_token: faker.string.uuid(),
    refresh_token: faker.string.uuid(),
    access_token_expired_day: 1,
    refresh_token_expired_day: 7,
  };
}

function sessionHandle(params: SessionTokenParams): { shouldSuccess: boolean; response: ResponseErrorInterface | SessionTokenResponse } {
  // Fix successfully normal customer
  const normalCustomerEmail = "admin@email.com";
  const normalCustomerPassword = "Admin123456";

  if (params.client_id != import.meta.env.VITE_BACKOFFICE_CLIENT_ID) {
    return {
      shouldSuccess: false,
      response: {
        error: "Token Invalid.",
        message: "OAuthClient matching query does not exist.",
      },
    };
  }

  if (params.email == normalCustomerEmail && params.password == normalCustomerPassword) {
    return {
      shouldSuccess: true,
      response: createToken(),
    };
  }

  return {
    shouldSuccess: false,
    response: {
      error: "Password Invalid.",
      message: "Password Invalid",
    },
  };
}

export default new AuthMockApi();
