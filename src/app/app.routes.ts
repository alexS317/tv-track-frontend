import { Routes } from '@angular/router';

export enum AppRoutes {
  HOME = '',
  REGISTER = 'register',
  LOGIN = 'login',
}

export const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: AppRoutes.REGISTER,
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
  },
  {
    path: '**',
    redirectTo: AppRoutes.HOME,
    pathMatch: 'full',
  },
];
