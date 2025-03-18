import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'forget',
    loadComponent: () => import('./forget/forget.page').then( m => m.ForgetPage)
  },
  {
    path: 'chistes',
    loadComponent: () => import('./chistes/chistes.page').then( m => m.ChistesPage)
  },
];
