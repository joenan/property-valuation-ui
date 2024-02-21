import { NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  loginForm: any = FormGroup;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _fb: FormBuilder
  ) {

    this.loginForm = this._fb.group({
      username: [""],
      password: [""],
      rememberMe: [false],
    });

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log("Navigation started");
      } else if (event instanceof NavigationEnd) {
        console.log("Navigation successful");
      } else if (event instanceof NavigationError) {
        console.error("Navigation error:", event.error);
      }
    });
  }

  ngOnInit(): void {}

  login() {
    this._authService
      .signIn({
        username: this.loginForm.get("username").value,
        password: this.loginForm.get("password").value,
      })
      .subscribe({
        next: (res) => {
          console.log("################### LOGIN SUCCESSFUL #################")
          this._router.navigate(["/app"]);
        },
        error: (error: HttpErrorResponse) => {
        },
      });

    
  }
}
