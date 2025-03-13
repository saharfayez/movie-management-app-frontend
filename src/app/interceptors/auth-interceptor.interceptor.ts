import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/authentication/auth-service.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthServiceService).getToken();

  return token
    ? next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
    : next(req);
};
