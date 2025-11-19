import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

import { Feed } from './pages/feed/feed';
import { Restaurant } from './pages/restaurant/restaurant';
import { Deliver } from './pages/deliver/deliver';
import { Business } from './pages/business/business';
import { Addrestaurant } from './pages/addrestaurant/addrestaurant';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'feed', component: Feed },
  { path: 'restaurant', component: Restaurant },
  { path: 'deliver', component: Deliver },
  { path: 'business', component: Business },
  { path: 'addrestaurant', component: Addrestaurant },
];
