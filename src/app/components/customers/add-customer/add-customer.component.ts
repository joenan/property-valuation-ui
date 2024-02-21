import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICustomer } from 'src/app/model/customer';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  customerForm: any=FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      CUSTOMER_NUMBER: ['', Validators.required],
      SHORT_NAME: ['', Validators.required],
      IS_INDIVIDUAL: ['', Validators.required],
      NATIONALITY: ['', Validators.required],
      NATIONALITY_NUMBER: ['', Validators.required],
      NATIONALITY_DESCRIPTION: ['', Validators.required],
      STREET_ADDRESS: ['', Validators.required],
      ADDRESS_LINE2: [[]],
      ADDRESS_LINE3: [[]],
      TOWN_COUNTRY: ['', Validators.required],
      POST_CODE: [[]],
      COUNTRY: ['', Validators.required],
      COUNTRY_CODE: ['', Validators.required],
      COUNTRY_CODE_NUMBER: ['', Validators.required],
      DISPATCH_CODE: ['', Validators.required],
      COMMUNICATION_CHANNEL: ['', Validators.required],
      PHONE_NUMBER: ['', Validators.required],
      OFFICE_PHONE_NUMBER: ['', Validators.required],
      FAX_NUMBER: ['', Validators.required],
      MOBILE_OPERATORISO: ['', Validators.required],
      MOBILE_OPERATOR_CODE: ['', Validators.required],
      SMS_NUMBER: ['', Validators.required],
      EMAIL: ['', [Validators.required, Validators.email]]
    });
  }

  addCustomers() {
    console.log('Form validity:', this.customerForm.valid);
    
    // If form is invalid, log errors for each form control
    if (this.customerForm.invalid) {
      Object.keys(this.customerForm.controls).forEach(controlName => {
        const control = this.customerForm.get(controlName);
        console.log(controlName, 'errors:', control.errors);
      });
    }
  }
}
