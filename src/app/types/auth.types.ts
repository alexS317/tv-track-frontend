import { UserResponse } from './user.types';

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
