import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service'; // استيراد الـ Service

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService // حقن الـ Service
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // تنظيف القيم من المسافات الزائدة
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      // استدعاء الـ API
      this.apiService.login(trimmedEmail, trimmedPassword).subscribe({
        next: (response) => {
          // افتراض إن الـ API بيرجع توكن
          const token = response.token;
          localStorage.setItem('token', token); // تخزين التوكن
          localStorage.setItem('isAdmin', 'true'); // لو عايز تحتفظ بالمنطق ده
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Invalid email or password';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly';
    }
  }
}