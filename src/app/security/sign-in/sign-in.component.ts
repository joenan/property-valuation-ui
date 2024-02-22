import { NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { selectIsAuthenticated, startLogin } from "src/app/store";



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
    private _fb: FormBuilder,
    private _store: Store
  ) {
    this.loginForm = this._fb.group({
      username: [""],
      password: [""],
      rememberMe: [false],
    });
  }

  ngOnInit() {
    this._store.select(selectIsAuthenticated).subscribe((success) => {
             if (success) {
               this._router.navigate(["/app/dashboard"]);
             }
    });
  }

  login() {

      const credential = {
        password: this.loginForm.value.password,
        username: this.loginForm.value.username,
      };
      this._store.dispatch(startLogin({ credential }));
  }
}
