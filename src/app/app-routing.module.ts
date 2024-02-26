import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./security/page-not-found/page-not-found.component";
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
      canActivate: [AuthGuard],

  },

  { path: "not-found", component: PageNotFoundComponent },
  // { path: "/initiators-details", component: InitiatorsDetailsComponent },
  {
    path: "**",
    redirectTo: "not-found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
