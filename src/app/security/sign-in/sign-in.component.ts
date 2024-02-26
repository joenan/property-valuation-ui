import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;  

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this._fb.group({
      username: [""],
      password: [""],
      rememberMe: [false],
    });
  }

  ngOnInit() {
    // You can perform any initialization logic here
  }

  submit() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        // Handle successful login response
        console.log("Login successful:", res);
        // Redirect or perform any action after successful login
        this._router.navigateByUrl('/app/dashboard');
      },
      (error) => {
        // Handle login error
        console.error("Login error:", error);
        // Optionally display an error message to the user
      }
    );
  }
}
