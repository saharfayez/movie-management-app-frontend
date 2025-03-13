import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../models/login-request.model';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private URL = 'http://localhost:8080/auth/login';

  private tokenKey = 'access-token';

  private roleKey = 'access-role';

  private httpClient = inject(HttpClient);

  private parsedRole: string = '';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post(this.URL, request).pipe(
      map((response: any) => {
        this.parsedRole = this.parseRole(response.role);
        console.log(this.parsedRole);

        this.saveToken(response.token);
        this.saveRole(this.parsedRole);

        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.tokenKey);
  }

  saveRole(role: string) {
    localStorage.removeItem(this.roleKey);
    localStorage.setItem(this.roleKey, role);
  }

  saveToken(token: string) {
    localStorage.removeItem(this.tokenKey);
    localStorage.setItem(this.tokenKey, token);
  }

  parseRole(roleString: string): string {
    return roleString.replace(/[\[\]]/g, '');
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
