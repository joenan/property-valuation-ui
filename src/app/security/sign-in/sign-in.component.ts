import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  loginObj: any = {
    username: "",
    password: "",
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigate(["/app/dashboard"]);
  }
}
