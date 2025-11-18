import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addrestaurant',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './addrestaurant.html',
  styleUrls: ['./addrestaurant.css'],
})
export class Addrestaurant {
  restaurantForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    if (this.restaurantForm.valid) {
      const formValue = this.restaurantForm.value;
      const restaurantData = {
        ...formValue,
        location: {
          lat: parseFloat(formValue.lat),
          lng: parseFloat(formValue.lng)
        },
        categories: formValue.categories.split(',').map((c: string) => c.trim())
      };
      console.log('Restaurant Data:', restaurantData);
      // هنا ممكن تعمل POST للـ backend
    } else {
      console.error('Form is invalid. Please check fields.');
      this.restaurantForm.markAllAsTouched();
    }
  }
}
