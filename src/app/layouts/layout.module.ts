import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "../security/auth.guard";

export const layoutRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("../components/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: "customers",
        loadChildren: () =>
          import("../components/customers/customers.module").then(
            (m) => m.CustomersModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: "initiators-details",
        loadChildren: () =>
          import(
            "../components/initiators-details/initiators-details.module"
          ).then((m) => m.InitiatorsDetailsModule),
          canActivate: [AuthGuard],

      },
    
  
      {
        path: "borrowers-details",
        loadChildren: () =>
          import(
            "../components/borrowers-details/borrowers-details.module"
          ).then((m) => m.BorrowersDetailsModule),
          canActivate: [AuthGuard],

      },
      {
        path: "comments",
        loadChildren: () =>
          import("../components/comments/comments.module").then(
            (m) => m.CommentsModule
          ),
          canActivate: [AuthGuard],

      },
      // {
      //   path: "upload-section",
      //   loadChildren: () =>
      //     import("../components/upload-section/upload-section.module").then(
      //       (m) => m.UploadSectionModule
      //     ),
      // },
      {
        path: "pvc-validation-requests",
        loadChildren: () =>
          import(
            "../components/pvc-validation-requests/pvc-validation-requests.module"
          ).then((m) => m.PvcValidationRequestsModule),
          canActivate: [AuthGuard],

      },
    ],
  },
];

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(layoutRoutes)],
})
export class LayoutModule {}
