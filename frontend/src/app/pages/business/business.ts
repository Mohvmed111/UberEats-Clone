import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ أضف ده هنا
@Component({
  selector: 'app-business',
  imports: [RouterModule],
  templateUrl: './business.html',
  styleUrl: './business.css',
})
export class Business {

}
