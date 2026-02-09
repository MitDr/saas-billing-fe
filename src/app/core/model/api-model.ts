// core/models/api.model.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  timestamp: string;
}

// core/models/auth.model.ts
export interface LoginRequest {
  username: string;
  password: string;
  deviceId: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';

  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface LogoutRequest {
  "username": string;
  "deviceId": string;
  "role": "ADMIN" | "USER";
  "refreshToken": string;
}

export interface RefreshRequest {
  "username": string;
  "deviceId": string;
  "role": "ADMIN" | "USER";
  "refreshToken": string;
}

export interface RefreshResponse {
  accessToken: string,
  refreshToken: string
}
