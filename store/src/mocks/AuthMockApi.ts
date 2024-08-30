import { faker } from "@faker-js/faker";

import {
  ConfirmEmailParams,
  ConfirmEmailResponse,
  ForgotPasswordParams,
  ForgotPasswordResponse,
  LogoutParams,
  LogoutResponse,
  RefreshTokenParams,
  RefreshTokenResponse,
  RegisterParams,
  RegisterResponse,
  ResetPasswordParams,
  ResetPasswordResponse,
  SessionTokenParams,
  SessionTokenResponse,
  TokenParams,
  TokenResponse,
} from "@interfaces/AuthInterface";
import { ResponseErrorInterface } from "@interfaces/ResponseErrorInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class AuthMockApi {
  public token(_params: TokenParams, shouldSuccess: boolean = true): ReturnType<TokenResponse> {
    return new Promise((resolve, reject) => {
      const response: TokenResponse = createToken();
      returnPromise<TokenResponse>(response, shouldSuccess, resolve, reject);
    });
  }

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

  public register(params: RegisterParams, _shouldSuccess: boolean = true): ReturnType<RegisterResponse> {
    return new Promise((resolve, reject) => {
      const { shouldSuccess, response } = registerHandle(params);
      if (shouldSuccess) {
        returnPromise<RegisterResponse>(response as RegisterResponse, shouldSuccess, resolve, reject);
      }
      returnPromise<RegisterResponse>({}, shouldSuccess, resolve, reject, response as ResponseErrorInterface);
    });
  }

  public confirmEmail(params: ConfirmEmailParams, _shouldSuccess: boolean = true): ReturnType<ConfirmEmailResponse> {
    return new Promise((resolve, reject) => {
      const { shouldSuccess, response } = confirmEmailHandle(params);
      if (shouldSuccess) {
        returnPromise<ConfirmEmailResponse>(response as ConfirmEmailResponse, shouldSuccess, resolve, reject);
      }
      returnPromise<ConfirmEmailResponse>({}, shouldSuccess, resolve, reject, response as ResponseErrorInterface);
    });
  }

  public forgotPassword(params: ForgotPasswordParams, _shouldSuccess: boolean = true): ReturnType<ForgotPasswordResponse> {
    return new Promise((resolve, reject) => {
      const { shouldSuccess, response } = forgotPasswordHandle(params);
      if (shouldSuccess) {
        returnPromise<ConfirmEmailResponse>(response as ForgotPasswordResponse, shouldSuccess, resolve, reject);
      }
      returnPromise<ConfirmEmailResponse>({}, shouldSuccess, resolve, reject, response as ResponseErrorInterface);
    });
  }

  public resetPassword(params: ResetPasswordParams, _shouldSuccess: boolean = true): ReturnType<ResetPasswordResponse> {
    return new Promise((resolve, reject) => {
      const { shouldSuccess, response } = resetPasswordHandle(params);
      if (shouldSuccess) {
        returnPromise<ResetPasswordResponse>(response as ResetPasswordResponse, shouldSuccess, resolve, reject);
      }
      returnPromise<ResetPasswordResponse>({}, shouldSuccess, resolve, reject, response as ResponseErrorInterface);
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
  const normalCustomerEmail = "customer@email.com";
  const normalCustomerPassword = "Customer123456";
  const unVerifiedCustomerEmail = "customer_unverified@email.com";
  const unVerifiedCustomerPassword = "Customer123456";

  if (params.client_id != import.meta.env.VITE_FRONTSIDE_CLIENT_ID) {
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

  if (params.email == unVerifiedCustomerEmail && params.password == unVerifiedCustomerPassword) {
    return {
      shouldSuccess: false,
      response: {
        error: "Inactive Account.",
        message: "Inactive Account",
      },
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

function registerHandle(params: RegisterParams): { shouldSuccess: boolean; response: ResponseErrorInterface | RegisterResponse } {
  // Fix successfully existing customer
  const existingCustomerEmail = "customer@email.com";

  if (params.email == existingCustomerEmail) {
    return {
      shouldSuccess: false,
      response: {
        error: "Validation Exception.",
        messages: [
          {
            email: "This field must be unique.",
          },
        ],
      },
    };
  }

  return {
    shouldSuccess: true,
    response: {},
  };
}

function confirmEmailHandle(params: ConfirmEmailParams): { shouldSuccess: boolean; response: ResponseErrorInterface | ConfirmEmailResponse } {
  // Fix successfully code
  const validCode = "123";
  const expiredCode = "expired-123";

  if (params.code == expiredCode) {
    return {
      shouldSuccess: false,
      response: {
        error: "Validation Exception.",
        messages: [
          {
            email: "This field must be unique.",
          },
        ],
      },
    };
  }

  if (params.code == validCode) {
    return {
      shouldSuccess: true,
      response: {},
    };
  }

  return {
    shouldSuccess: false,
    response: {
      error: "Confirm Email Invalid.",
      message: "Signature verification failed",
    },
  };
}

function forgotPasswordHandle(params: ForgotPasswordParams): { shouldSuccess: boolean; response: ResponseErrorInterface | ForgotPasswordResponse } {
  // Fix successfully existing customer
  const existingCustomerEmail = "customer@email.com";

  if (params.email == existingCustomerEmail) {
    return {
      shouldSuccess: true,
      response: {},
    };
  }

  return {
    shouldSuccess: false,
    response: {
      error: "Resource Not Found.",
      message: "Resource Not Found.",
    },
  };
}

function resetPasswordHandle(params: ResetPasswordParams): { shouldSuccess: boolean; response: ResponseErrorInterface | ResetPasswordResponse } {
  // Fix successfully existing customer
  const expiredCode = "1234";
  const fakeValidCodeWithoutCustomer = "1235";

  if (params.code == expiredCode) {
    return {
      shouldSuccess: false,
      response: {
        error: "Email Expired.",
        message: "Email Expired.",
      },
    };
  }

  if (params.code == fakeValidCodeWithoutCustomer) {
    return {
      shouldSuccess: false,
      response: {
        error: "Resource Not Found.",
        message: "Resource Not Found.",
      },
    };
  }

  if (params.password.length < 8) {
    return {
      shouldSuccess: false,
      response: {
        error: "Validation Exception.",
        message: "Password should more than 8 character.",
      },
    };
  }

  return {
    shouldSuccess: true,
    response: {},
  };
}

export default new AuthMockApi();
