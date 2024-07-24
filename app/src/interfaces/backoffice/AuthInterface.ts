// API Design

// sessionToken [method post] : '/session'
// params SessionTokenParams
// return SessionTokenResponse

// refreshToken [method post] : '/session-refresh'
// params RefreshTokenParams
// return RefreshTokenResponse

// logout [method delete] : '/session'
// params LogoutParams
// return LogoutResponse : 200 ok

// APIs Parameter Interface
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

// APIs Response Interface
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
