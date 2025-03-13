import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/authentication/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginRequest } from '../../../models/login-request.model';
import { ErrorServiceService } from '../../../services/error/error-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private errorService = inject(ErrorServiceService)

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const request: LoginRequest = {
        username: username!,
        password: password!,
      };
      this.authService.login(request).subscribe({
        next: (response) => {
          console.log('token', response.token);
          console.log('role', response.role);
          const role = this.authService.getRole();

          const path =
            role === 'ROLE_ADMIN' ? 'admin/dashboard' : 'user/dashboard';
          this.router.navigate([path]);
        },
        error: (err) => {
          console.error('Error:', err);
          this.errorService.showError("Username or password is wrong")
        },
      });
    }
  }
}
