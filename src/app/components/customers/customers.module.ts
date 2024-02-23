import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomersComponent } from "./customers.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AddCustomerComponent } from "./add-customer/add-customer.component";

export const CustomerRoutes: Routes = [
  {
    path: "",
    component: CustomersComponent,
  },
  {
    path: "add-customer",
    component: AddCustomerComponent,
  },
];
@NgModule({
  declarations: [CustomersComponent, AddCustomerComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(CustomerRoutes)],
  providers: []
})
export class CustomersModule {}
