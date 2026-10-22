import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppRoutes } from '../app.routes';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (await authService.isLoggedIn()) {
    return true;
  }
  return router.createUrlTree([AppRoutes.LOGIN]);
};
