import { SignInComponent } from "./security/sign-in/sign-in.component";
import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PageNotFoundComponent } from "./security/page-not-found/page-not-found.component";
import { HomeComponent } from "./layouts/home/home.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { InitiatorsDetailsComponent } from "./components/initiators-details/initiators-details.component";
import { AuthGuard } from "./security/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./security/security.module").then((m) => m.SecurityModule),
  },

  {
    path: "app",
    loadChildren: () =>
      import("./layouts/layout.module").then((m) => m.LayoutModule),
      canMatch: [() => inject(AuthGuard).canMatch()],
  },

  { path: "not-found", component: PageNotFoundComponent },
  // { path: "/initiators-details", component: InitiatorsDetailsComponent },
  {
    path: "**",
    redirectTo: "not-found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
