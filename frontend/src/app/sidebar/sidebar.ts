import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ لازم عشان routerLink

@Component({
  selector: 'app-sidebar',
  standalone: true,
    imports: [RouterModule], // ✅ ضيف RouterModule
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  @Input() isOpen = false;
  isScrolled = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  
 
}
