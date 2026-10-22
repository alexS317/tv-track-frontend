import { inject, Service } from '@angular/core';
import { ApiService } from './api.service';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreferences } from '../constants/user-preferences.enum';
import { AuthResponse, RegisterRequest } from '../types/auth.types';

const REGISTER_ENDPOINT = '/auth/register';

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
}
