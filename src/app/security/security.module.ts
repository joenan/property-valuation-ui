import { NgModule } from "@angular/core";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RouterModule, Routes } from "@angular/router";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { AuthService } from "./auth.service";
import { SharedModule } from "../shared/shared.module";
import { NgxSpinner, NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";

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
    SharedModule,
    NgxSpinnerModule,
    ToastrModule,
    RouterModule.forChild(securityRoutes),
  ],
  providers: [AuthService],
})
export class SecurityModule {}
