import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalRestaurants: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface RestaurantListItem {
  _id: string;
  name: string;
  categories: string[];
  rating: number;
  image: string;
}

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
})
export class Restaurant implements OnInit {
  loading = true;
  error: string | null = null;
  restaurants: RestaurantListItem[] = [];
  pagination?: Pagination;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{
        success: boolean;
        message: string;
        data: { pagination: Pagination; restaurants: RestaurantListItem[] };
      }>('http://localhost:4001/api/restaurants')
      .subscribe({
        next: (res) => {
          this.restaurants = res?.data?.restaurants ?? [];
          this.pagination = res?.data?.pagination;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load restaurants.';
          this.loading = false;
        },
      });
  }

  sanitize(url: string): string {
    return (url || '').replace(/`/g, '').trim();
  }
}
