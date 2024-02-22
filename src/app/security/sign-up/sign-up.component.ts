import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';


@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _store: Store
    ) {
        this.signUpForm = this._fb.group({
            username: [""],
            email: [""],
            name: [""],
            businessUnit: [""],
            contactNumber: [""],
            password: [""]
        });
    }

  ngOnInit(): void {}

  signUp() {
    this._router.navigate(["/"]);
  }
}
