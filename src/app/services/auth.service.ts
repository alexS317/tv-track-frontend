import { inject, Service } from '@angular/core';
import { ApiService } from './api.service';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreferences } from '../constants/user-preferences.enum';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth.types';

const REGISTER_ENDPOINT = '/auth/register';
const LOGIN_ENDPOINT = '/auth/login';

@Service()
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly userPreferencesService = inject(UserPreferencesService);

  public async register(request: RegisterRequest): Promise<void> {
    try {
      const response = await this.api.post<AuthResponse>(REGISTER_ENDPOINT, request);
      this.userPreferencesService.set(UserPreferences.AUTH_TOKEN, response.token);
    } catch (error) {
      throw error;
    }
  }

  public async login(request: LoginRequest): Promise<void> {
    try {
      const response = await this.api.post<AuthResponse>(LOGIN_ENDPOINT, request);
      this.userPreferencesService.set(UserPreferences.AUTH_TOKEN, response.token);
    } catch (error) {
      throw error;
    }
  }

  public async logout(): Promise<void> {
    await this.userPreferencesService.remove(UserPreferences.AUTH_TOKEN);
  }

  public async isLoggedIn(): Promise<boolean> {
    return (await this.userPreferencesService.get(UserPreferences.AUTH_TOKEN)) !== null;
  }
}
