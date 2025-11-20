import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addrestaurant',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './addrestaurant.html',
  styleUrls: ['./addrestaurant.css'],
})
export class Addrestaurant {
  restaurantForm!: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: [''],
      address: ['', Validators.required],
      lat: [''],
      lng: [''],
      categories: ['']
    });
  }

  onSubmit(): void {
    if (this.restaurantForm.invalid) {
      this.restaurantForm.markAllAsTouched();
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add a restaurant.');
      return;
    }

    this.submitting = true;

    const formValue = this.restaurantForm.value;
    const payload: any = {
      name: formValue.name,
      description: formValue.description || undefined,
      image: (formValue.image || '').replace(/`/g, '').trim() || undefined,
      address: formValue.address,
      categories: (formValue.categories || '')
        .split(',')
        .map((c: string) => c.trim())
        .filter((c: string) => c.length > 0),

    };

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http
      .post<{ success: boolean; message: string; data: { restaurant: any } }>(
        'http://localhost:4001/api/restaurants',
        payload,
        { headers }
      )
      .subscribe({
        next: (res) => {
          this.submitting = false;
          alert(res.message || 'Restaurant created successfully');
          // Optionally navigate to restaurant list
          this.router.navigate(['/restaurant']);
        },
        error: (err) => {
          this.submitting = false;
          const msg = err?.error?.message || 'Failed to create restaurant';
          alert(msg);
          console.error('Create restaurant error:', err);
        },
      });
  }
}
