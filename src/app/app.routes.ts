import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { showsResolver } from './resolvers/shows.resolver';
import { showDetailsResolver } from './resolvers/show-details.resolver';

export enum AppRoutes {
  HOME = '',
  REGISTER = 'register',
  LOGIN = 'login',
  SHOWS = 'shows',
}

export const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [authGuard],
    resolve: {
      shows: showsResolver,
    },
  },
  {
    path: AppRoutes.REGISTER,
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
    canActivate: [guestGuard],
  },
  {
    path: AppRoutes.LOGIN,
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [guestGuard],
  },
  {
    path: `${AppRoutes.SHOWS}/:id`,
    loadComponent: () =>
      import('./pages/show-details/show-details.page').then(m => m.ShowDetailsPage),
    canActivate: [authGuard],
    resolve: {
      showDetails: showDetailsResolver,
    },
  },
  {
    path: '**',
    redirectTo: AppRoutes.HOME,
    pathMatch: 'full',
  },
];
