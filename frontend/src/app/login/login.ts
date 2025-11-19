import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Invalid credentials!');
      },
    });
  }
}
