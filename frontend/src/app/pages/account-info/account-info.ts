import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-account-info",
  templateUrl: "./account-info.html",
  styleUrls: ["./account-info.css"],
  imports: [CommonModule]
})
export class AccountInfo {

  user = JSON.parse(localStorage.getItem("user") || "null");

}
