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

  // 👇 الفورم
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  // 👇 دالة الـ Login
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); 
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (res: any) => {
        console.log('Login success:', res.message);

        // نحفظ التوكن
        localStorage.setItem('token', res.data.accessToken);

        // 👇 هنا التوجيه لصفحة تانية (غيّرها زي ما تحب)
        this.router.navigate(['/dashboard']); // بدلها بالصفحة اللي عايزها
      },
      error: (err: any) => {
        console.error('Login error:', err);
        alert(err.error?.message || 'Something went wrong!');
      }
    });
  }

  // 👇 getters
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
