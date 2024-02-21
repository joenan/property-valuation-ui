import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder
    ) {
        this.signUpForm = this._formBuilder.group({
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
