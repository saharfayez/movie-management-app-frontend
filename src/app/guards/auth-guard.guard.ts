import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/authentication/auth-service.service';
import { inject } from '@angular/core';

export const AuthGuardGuard: CanActivateFn = (route, state) => {
  const token = inject(AuthServiceService).getToken();
  const router = inject(Router);

  return token ? true : router.parseUrl('/login');
};
