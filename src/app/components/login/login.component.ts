import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private router: Router) {
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

      // تسجيل القيم في الـ Console للتصحيح
      console.log('Email:', trimmedEmail);
      console.log('Password:', trimmedPassword);

      // المقارنة بعد التنظيف
      if (trimmedEmail === 'admin@trippool.com' && trimmedPassword === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    } else {
      this.errorMessage = 'Please fill in all fields correctly';
    }
  }
}