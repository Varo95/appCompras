import {mapToCanActivate, Routes} from '@angular/router';
import { Register } from './components/register/register'
import {Login} from './components/login/login';
import {Manage} from './components/manage/manage';
import {AuthService} from './services/auth';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: 'register',
    component: Register
  }, {
    path: 'login',
    component: Login
  }, {
    path: 'manage',
    component: Manage,
    canActivate: mapToCanActivate([AuthService]),
  }
];
