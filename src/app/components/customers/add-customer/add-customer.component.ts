import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  customerForm:any= FormGroup;

  customers: Customer[] = [];

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerNumber: [{ value: '', disabled: true }],
      shortName: ["", [Validators.required, Validators.maxLength(50)]],
      Individual: [false],
      nationality: ["", [Validators.required, Validators.maxLength(50)]],
      nationalityNumber: ["", [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(14)]],
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
      email: ["", [Validators.required, Validators.email]],
    });
  }


  addCustomer(): void {
    if (this.customerForm.invalid) {
       
      Object.keys(this.customerForm.controls).forEach(controlName => {
        const control = this.customerForm.get(controlName);
        
      });
      return;  
    }
  
     
    const formData = this.customerForm.value as Customer; // Assuming Customer is the interface for customer data
    this.customerService.createCustomer(formData).subscribe({
      next: response => {
        console.log('Customer added successfully:', response);
        this.toastr.success('Customer has been saved successfully!', 'Success', {
          timeOut: 2000
        });
        this.customerForm.reset();
      },
      error: error => {
        this.toastr.error(error);
      },
      complete: () => {
        console.log('Complete: Customer added successfully.');
      }
    });
  }

  
}
