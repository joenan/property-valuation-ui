import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  customerForm:any= FormGroup;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerNumber: [""],
      shortName: [""],
      Individual: [false],
      nationality: [""],
      nationalityNumber: [""],
      nationalityDescription: [""],
      streetAddress: [""],
      addressLine2: [""],
      addressLine3: [""],
      townCountry: [""],
      postCode: [""],
      country: [""],
      countryCode: [""],
      countryCodeNumber: [""],
      dispatchCode: [""],
      communicationChannel: [""],
      phoneNumber: [""],
      officePhoneNumber: [""],
      faxNumber: [""],
      mobileOperatorISO: [""],
      mobileOperatorCode: [""],
      smsNumber: [""],
      email: [""],
    });
  }


  addCustomer(): void {
    if (this.customerForm.invalid) {
      // If the form is invalid, log the errors for each control
      Object.keys(this.customerForm.controls).forEach(controlName => {
        const control = this.customerForm.get(controlName);
        console.log(controlName, 'errors:', control.errors);
      });
      return; // Stop execution if the form is invalid
    }
  
    // If the form is valid, submit the data to the service
    const formData = this.customerForm.value as Customer; // Assuming Customer is the interface for customer data
    this.customerService.createCustomer(formData).subscribe({
      next: response => {
        console.log('Customer added successfully:', response);
        // Reset the form after successful submission
        this.customerForm.reset();
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Complete: Customer added successfully.');
      }
    });
  }
  
}
