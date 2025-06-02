import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core'; // تم إضافة OnInit, PLATFORM_ID, Inject
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // تم إضافة isPlatformBrowser
import { ApiService } from '../../services/api.service'; // استيراد الـ Service

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { // تم إضافة implements OnInit
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService, // حقن الـ Service
    @Inject(PLATFORM_ID) private platformId: Object // حقن PLATFORM_ID للتحقق من بيئة التشغيل
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // تم إضافة ngOnInit لتتوافق مع implements OnInit.
  // في هذا المكون، لا يوجد منطق محدد مطلوب عند التهيئة، لذا يمكن أن تظل فارغة.
  ngOnInit(): void {
    // يمكن وضع أي منطق تهيئة هنا إذا لزم الأمر عند بدء تشغيل المكون
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // تنظيف القيم من المسافات الزائدة
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      // استدعاء الـ API لتسجيل الدخول
      this.apiService.login(trimmedEmail, trimmedPassword).subscribe({
        next: (response) => {
          // افتراض أن الـ API يرجع توكن (token)
          const token = response.token;

          // **الدمج الجديد: حماية الوصول إلى localStorage**
          // يتم تخزين البيانات في localStorage فقط إذا كان التطبيق يعمل في بيئة المتصفح.
          // هذا يمنع خطأ "localStorage is not defined" عند البناء في بيئة الخادم (SSR).
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', token); // تخزين التوكن
            localStorage.setItem('isAdmin', 'true'); // تخزين علامة isAdmin
          }

          this.router.navigate(['/dashboard']); // التوجيه إلى لوحة التحكم بعد تسجيل الدخول بنجاح
        },
        error: (err) => {
          // عرض رسالة خطأ في حالة فشل تسجيل الدخول
          this.errorMessage = err.message || 'Invalid email or password';
        }
      });
    } else {
      // عرض رسالة خطأ إذا كانت حقول النموذج غير صالحة
      this.errorMessage = 'Please fill in all fields correctly';
    }
  }
}