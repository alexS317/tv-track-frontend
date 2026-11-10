import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AppRoutes } from '../app.routes';
import { ToastService } from '../services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);

  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  // Turn promise into observable
  return from(authService.getAuthToken()).pipe(
    switchMap(token => {
      if (!token) {
        return next(req);
      }

      return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(
        catchError(error => {
          // Logout and redirect if invalid token is still saved in local storage
          if (error.status === 401) {
            toastService.error('Unauthorized.');
            authService.logout();
            router.navigate([AppRoutes.LOGIN]);
          }
          if (error.status === 404) {
            toastService.error(error.error.detail);
            router.navigate([AppRoutes.HOME]);
          }
          return throwError(() => error);
        }),
      );
    }),
  );
};
