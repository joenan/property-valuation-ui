import { Component, OnInit } from "@angular/core";
import { Customer } from "src/app/model/customer";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.css"],
})
export class CustomersComponent implements OnInit {
  constructor(private router: Router, private customerService:CustomerService) {}
  goToNext() {
    // this.router.navigate(["dashboard/initiators-details"]);
    this.router.navigate(["/app/initiators-details"]);
  }

  customers: Customer[] = [

  ];
  ngOnInit() {

    this.fetchCustomers()
  }

  fetchCustomers() {
    this.customerService.retrieveCustomers(0,10).subscribe({
      next: response => {
        this.customers = response;
        console.log('Next:', response);
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Complete: Valuation types fetched successfully.');
      }
    });
  }
  
}
