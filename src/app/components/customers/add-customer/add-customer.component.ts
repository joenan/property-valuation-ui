import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  customerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerNumber: [""],
      shortName: [""],
      individual: [""],
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

  addCustomers() {
    console.log('Form validity:', this.customerForm.valid);
     console.log("Customer form values:", this.customerForm.value);
    // If form is invalid, log errors for each form control
    if (this.customerForm.invalid) {
      Object.keys(this.customerForm.controls).forEach(controlName => {
        const control = this.customerForm.get(controlName);
        console.log(controlName, 'errors:', control?.errors);
      });
    }
  }
}
