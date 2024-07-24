// API Design
// token [method post] : '/token'
// params TokenParams
// return TokenResponse

// sessionToken [method post] : '/session'
// params SessionTokenParams
// return SessionTokenResponse

// refreshToken [method post] : '/session-refresh'
// params RefreshTokenParams
// return RefreshTokenResponse

// logout [method delete] : '/session'
// params LogoutParams
// return LogoutResponse : 200 ok

// register [method post] : '/register'
// params RegisterParams
// return RegisterResponse: 200 ok

// confirmEmail [method post] : '/confirm-email'
// params ConfirmEmailParams
// return ConfirmEmailResponse: 200 ok

// forgotPassword [method post] : '/forgot-password'
// params ForgotPasswordParams
// return ForgotPasswordResponse: 200 ok

// resetPassword [method post] : '/reset-password'
// params ResetPasswordParams
// return ResetPasswordResponse: 200 ok

// APIs Parameter Interface
export interface TokenParams {
  client_id: string;
}

export interface SessionTokenParams {
  client_id: string;
  email: string;
  password: string;
}

export interface RefreshTokenParams {
  client_id: string;
  refresh_token: string;
}

export interface LogoutParams {}

export interface RegisterParams {
  email: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  password: string;
}

export interface ConfirmEmailParams {
  code: string;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  code: string;
  password: string;
}

// APIs Response Interface
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  access_token_expired_day: number;
  refresh_token_expired_day: number;
}

export interface SessionTokenResponse {
  access_token: string;
  refresh_token: string;
  access_token_expired_day: number;
  refresh_token_expired_day: number;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  access_token_expired_day: number;
  refresh_token_expired_day: number;
}

export interface LogoutResponse {}

export interface RegisterResponse {}

export interface ConfirmEmailResponse {}

export interface ForgotPasswordResponse {}

export interface ResetPasswordResponse {}
