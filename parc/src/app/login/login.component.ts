import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

  loginError = '';
  isLoading = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(public authService: AuthService, public router: Router) {}

  public login() {
    if (this.form.valid) {
      this.isLoading = true;
      this.loginError = '';

      this.authService.login(this.form.getRawValue()).subscribe({
        next: () => {
          if (this.authService.isLoggedIn) {
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError = 'Échec de la connexion. Vérifiez vos identifiants.';
          this.snackBar.open(this.loginError, 'Fermer', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
