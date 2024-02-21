import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RouterModule, Routes } from "@angular/router";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

export const securityRoutes: Routes = [
  {
    path: "",
    component: SignInComponent,
  },
  {
    path: "sign-up",
    component: SignUpComponent,
  },
];

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(securityRoutes),
  ],
})
export class SecurityModule {}
