import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

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
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
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
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        // Handle successful login response
        this._router.navigateByUrl('/app/dashboard');
        this.toastr.success("Login is successful");
        this.spinner.hide();
      },
      (error) => {
        // Handle login error
        this.spinner.hide();
        // Optionally display an error message to the user
      }
    );
  }
}
