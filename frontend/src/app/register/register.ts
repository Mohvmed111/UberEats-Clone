import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  user = { 
    name: '', 
    email: '', 
    password: '' 
  };

  confirmPassword: string = '';   // ⬅️ أضفناه
  passwordMismatch: boolean = false; // ⬅️ للرسالة

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onSubmit() {

  // Check match
  if (this.user.password !== this.confirmPassword) {
    this.passwordMismatch = true;
    return;
  }

  this.passwordMismatch = false;

  // Submit request
  this.authService.register(this.user).subscribe({
    next: (res: any) => {
      alert('Registration successful!');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      alert(err.error.message || 'Something went wrong!');
    }
  });
}

}
