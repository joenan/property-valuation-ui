import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-initiators-details",
  templateUrl: "./initiators-details.component.html",
  styleUrls: ["./initiators-details.component.css"],
})
export class InitiatorsDetailsComponent {
  constructor(private router: Router) {}
  goToNext() {
    // this.router.navigate(["dashboard/initiators-details"]);
    this.router.navigate(["/app/borrowers-details"]);
  }

  goToPrevious() {
    this.router.navigate(["/app/customers"]);
  }
}
