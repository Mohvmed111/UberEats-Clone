import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- المهم

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], // <-- ضيفه هنا
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  confirmPassword = '';
  passwordMismatch = false;

  constructor(private authService: AuthService, private router: Router) {}

  checkPasswordMatch() {
    this.passwordMismatch = this.user.password !== this.confirmPassword;
  }
  onSubmit() {
    if (this.passwordMismatch) return;

    const payload = {
      username: this.user.name, // map الاسم اللي المستخدم كتبه
      email: this.user.email,
      password: this.user.password,
      confirmPassword: this.confirmPassword,
    };

    this.authService.register(payload).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => alert(err.error?.message || 'Something went wrong'),
    });
  }
}
