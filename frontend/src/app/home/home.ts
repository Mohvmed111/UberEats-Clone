import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar';
import { RouterModule } from '@angular/router'; // ✅ لازم
import { Feed } from '../pages/feed/feed';
import { Restaurant} from '../pages/restaurant/restaurant';
import { Deliver } from '../pages/deliver/deliver';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent,RouterModule,Feed,Restaurant,Deliver],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  address = '';
  deliveryTime = 'now';
  sidebarOpen = false;
  isScrolled = false;
  private scrollThreshold = 50;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > this.scrollThreshold;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  search() {
    console.log('Searching for:', this.address, this.deliveryTime);
  }
}
