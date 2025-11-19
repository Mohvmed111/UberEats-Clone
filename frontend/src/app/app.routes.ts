import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

// الصفحات
import { Feed } from './pages/feed/feed';
import { Restaurant } from './pages/restaurant/restaurant';
import { Deliver } from './pages/deliver/deliver';
import { Business } from './pages/business/business';
import { Addrestaurant } from './pages/addrestaurant/addrestaurant';

import { Dashboard } from './pages/dashboard/dashboard';
import { AccountInfo } from './pages/account-info/account-info';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // الصفحات العادية
  { path: 'feed', component: Feed},
  { path: 'restaurant', component: Restaurant },
  { path: 'deliver', component: Deliver },
  { path: 'business', component: Business },
  { path: 'addrestaurant', component: Addrestaurant },

  // ⚡ Dashboard + Child routes
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: 'account', component: AccountInfo }
      // لو عايز تزود صفحات تانية جوه الداش:
      // { path: 'orders', component: Orders },
      // { path: '', component: HomeDashboard },
    ]
  },

  // fallback
  { path: '**', redirectTo: '' }
];
