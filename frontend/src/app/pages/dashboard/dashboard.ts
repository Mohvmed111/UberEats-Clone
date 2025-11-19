import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-dashboard',
   imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  // Profile Menu
  menuOpen: boolean = false;

  user = {
    name: 'Mohamed' // ممكن تجيب الاسم من سيرفس لاحقاً
  };

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    console.log('User logged out');
    // هنا ممكن تحذف token وتعمل redirect للـ login
  }

  // Restaurants Array
  restaurants = [
    { name: "KFC", category: "Fried Chicken - Fast Food", image: "https://marketplace.canva.com/EAFpeiTrl4c/2/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-a1RYzvS1EFo.jpg" },
    { name: "McDonald's", category: "Burgers - Fast Food", image: "https://1000logos.net/wp-content/uploads/2017/03/McDonalds-Logo-500x281.png" },
    { name: "Pizza Hut", category: "Pizza - Fast Food", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Pizza_Hut_logo.svg/1200px-Pizza_Hut_logo.svg.png" },
    { name: "Burger King", category: "Burgers - Fast Food", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Burger_King_logo.svg/1200px-Burger_King_logo.svg.png" },
    { name: "Hardee's", category: "Burgers - Sandwiches", image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hardees_logo.png" },
    { name: "Papa John's", category: "Pizza - Delivery", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Papa_John%27s_logo.svg/1200px-Papa_John%27s_logo.svg.png" },
    { name: "Chick-fil-A", category: "Chicken - Fast Food", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Chick-fil-A_Logo.svg/1200px-Chick-fil-A_Logo.svg.png" },
    { name: "Starbucks", category: "Coffee - Drinks", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png" },
    { name: "Subway", category: "Sandwiches - Healthy", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Subway_logo.png" },
    { name: "Domino's", category: "Pizza - Delivery", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Dominos_pizza_logo.svg/1200px-Dominos_pizza_logo.svg.png" }
  ];

}
