import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { InitiatorsDetailsComponent } from "./initiators-details.component";
import { SharedModule } from "src/app/shared/shared.module";

export const InitiatorsDetailsRoutes: Routes = [
  {
    path: "",
    component: InitiatorsDetailsComponent,
  },
];

@NgModule({
  declarations: [InitiatorsDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(InitiatorsDetailsRoutes),
  ],
})
export class InitiatorsDetailsModule {}
