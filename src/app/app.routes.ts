import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import {AuthGuard} from "./guard/auth-guard.service";
import {LoginComponent} from "./login/login.component";
import { AuthGuardLogin } from './login/LoginGuard';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'manager',
    loadChildren: 'app/manager/manager.module#ManagerModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardLogin]
  },
  { path: '**',    component: NoContentComponent },
];
