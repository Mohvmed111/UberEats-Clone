import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Feed } from './pages/feed/feed';
import { Restaurant } from './pages/restaurant/restaurant';
import { Deliver } from './pages/deliver/deliver';
import { Footer } from './footer/footer';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Home,Feed,Restaurant,Deliver,Footer,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
