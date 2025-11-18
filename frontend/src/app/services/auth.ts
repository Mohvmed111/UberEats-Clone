// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Restaurant {
  name: string;
  description?: string;
  image?: string;
  address?: string;
  location?: { lat: number; lng: number };
  categories?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:4001/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, credentials);
  }

  register(user: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }
}
