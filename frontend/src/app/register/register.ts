import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };

  registerForm = new FormGroup(
    {
      name:new FormControl('', [Validators.required, Validators.minLength(2)]),

      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  constructor(private authService: AuthService, private router: Router) {}

  // Custom validator

  onSubmit() {
    if (this.registerForm.invalid) return;

    const name = this.registerForm.controls.name.value || '';
    const email = this.registerForm.controls.email.value || '';
    const password = this.registerForm.controls.password.value || '';

    const confirmPassword = this.registerForm.controls.confirmPassword.value || '';

    //{, email, password } ;

    this.authService.register({ username:name, email, password, confirmPassword }).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.message || 'Something went wrong!');
      },
    });
  }
}
