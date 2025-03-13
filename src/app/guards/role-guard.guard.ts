import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/authentication/auth-service.service';

export const RoleGuardGuard: CanActivateFn = (route, state) => {
  const role = inject(AuthServiceService).getRole();
  const router = inject(Router);

  
  return role === 'ROLE_ADMIN'? true : router.parseUrl('/login')
};
