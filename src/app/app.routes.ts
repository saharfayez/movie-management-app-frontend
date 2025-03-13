import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { RoleGuardGuard } from './guards/role-guard.guard';
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';
import { MovieDetailsComponent } from './components/dashboard/user-dashboard/movie-details/movie-details.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuardGuard, RoleGuardGuard],
  },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path:'user/dashboard/:imdbID',
    component: MovieDetailsComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
