import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  
  // 👇 هنا بنعرف الفورم
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  // 👇 دالة submit للفورم
  onSubmit() {
    if (this.loginForm.invalid) {
      // لو الفورم مش صحيح متعملش حاجة
      this.loginForm.markAllAsTouched(); // ده يوريك الأخطاء فوراً
      return;
    }

    // 👇 ناخد القيم من الفورم
    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (res: any) => {
        console.log('Login success:', res.message);
        localStorage.setItem('token', res.data.accessToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('Login error:', err);
        alert(err.error?.message || 'Something went wrong!');
      }
    });
  }

  // 👇 getters عشان نسهّل الوصول للقيم والأخطاء في الـ template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
