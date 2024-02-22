import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/security/auth.service";
import { CustomerService } from "src/app/services/customer.service";
import { SettingsService } from "src/app/services/settings.service";
import { LoginResponse } from "src/app/utils/LoginResponse";

@Component({
  selector: "app-initiators-details",
  templateUrl: "./initiators-details.component.html",
  styleUrls: ["./initiators-details.component.css"],
})
export class InitiatorsDetailsComponent implements OnInit, OnDestroy {
  userDetailsSubscription!: Subscription;
  userDetails!: Partial<LoginResponse>;
  customers: any[] = [
    { customerNumber: '123', name: 'John Doe', contactNo: '1234567890', email: 'john@example.com', address: '123 Main St' },
    { customerNumber: '456', name: 'Jane Smith', contactNo: '0987654321', email: 'jane@example.com', address: '456 Elm St' }
    // Add more mock customer data as needed
  ];
  valuationTypes: any[] = [];
  facilityTypes: any[] = [];
  categories: any[] = [];
  purposes: any[] = [];
  currencies: any[] = [];
  formData: any =FormGroup;
  showBorrowerForm: boolean = false; 
  showPropertyFacilityForm:boolean =true

  constructor(private customerService:CustomerService, private router: Router, private formBuilder:FormBuilder, private authService: AuthService, private setting:SettingsService) {}

  ngOnInit() {
    this.userDetailsSubscription = this.authService.getUserDetails().subscribe(userDetails => {
      this.userDetails = userDetails;
     
    });

    this.formData = this.formBuilder.group({
      facilityType: ['', Validators.required],
      category: ['', Validators.required],
      purpose: ['', Validators.required],
      termMonths: ['', Validators.required],
      currency: ['', Validators.required],
      amount: ['', Validators.required],
      fosReference: ['', Validators.required],
      reference: ['', Validators.required],
      evaluationType: ['', Validators.required],
      borrowers: this.formBuilder.array([
        this.createBorrowerFormGroup()
      ]),
      facilityDetails: this.formBuilder.group({
        facilityType: ['', Validators.required],
        category: ['', Validators.required],
        purposeOfPropertyValuation: ['', Validators.required],
        termInMonths: ['', Validators.required],
        currency: ['', Validators.required],
        amount: ['', Validators.required],
        propertyValuation: ['', Validators.required]
      })
    });

     
    this.fetchValuationTypes()
    this. fetchFacilityType()
    this.fetchCategoryType()
    this.fetchPurpose()
    this.fetchCurrency()
  }


  
  

  
  getBorrowerTitle(index: number): string {
    return index === 0 ? "Main Borrower" : `Joint Borrower - #${index}`;
  }
  get borrowers(): FormArray {
    return this.formData.get("borrowers") as FormArray;
  }

  // Function to create a form group for a borrower
  createBorrowerFormGroup(): FormGroup {
    return this.formBuilder.group({
      customerNumber: "",
      contactNo: "",
      shortName: "",
      email: "",
      address: "",
    }); 
  }

  addBorrower(): void {
    this.borrowers.push(this.createBorrowerFormGroup());
  }

  removeBorrower(index: number): void {
    this.borrowers.removeAt(index);
  }

  ngOnDestroy() {
    if (this.userDetailsSubscription) {
      this.userDetailsSubscription.unsubscribe();
    }
  }

  goToNext() {
    this.showPropertyFacilityForm = false
    this.showBorrowerForm =true
  }

  goToPrevious() {
    this.showPropertyFacilityForm = true
    this.showBorrowerForm =false
  }

  fetchValuationTypes() {
    this.setting.getAllValuationTypes().subscribe({
      next: response => {
        this.valuationTypes = response;
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
  
  fetchFacilityType() {
    this.setting.getAllFacilities().subscribe({
      next: response => {
        this.facilityTypes = response;
        console.log('Next:', response);
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Complete: Facility types fetched successfully.');
      }
    });
  }
  
  fetchCategoryType() {
    this.setting.getAllCategories().subscribe({
      next: response => {
        this.categories = response;
        console.log('Next:', response);
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Complete: Category types fetched successfully.');
      }
    });
  }
  
  fetchPurpose() {
    this.setting.getAllValuationPurpose().subscribe({
      next: response => {
        this.purposes = response;
        console.log('Next:', response);
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Complete: Purpose types fetched successfully.');
      }
    });
  }
  
  fetchCurrency() {
    this.setting.getAllCurrencies().subscribe({
      next: response => {
        this.currencies = response;
        console.log('Next:', response);
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Complete: Currency types fetched successfully.');
      }
    });
  }
  
  queryCustomerByNumber(borrowerIndex: number) {
    const borrowerFormArray = this.formData.get('borrowers') as FormArray;
    const borrowerFormGroup = borrowerFormArray.at(borrowerIndex);
    const customerNumberControl = borrowerFormGroup.get('customerNumber');
  
    if (customerNumberControl && customerNumberControl.value) {
      const customerNumber = customerNumberControl.value;
  
      // Call the service to retrieve the customer by their number
      this.customerService.retrieveCustomerByCustomerNumber(customerNumber).subscribe(
        (customer: any) => {
          // Update the form with the retrieved customer data
          borrowerFormGroup.patchValue({
            customerName: customer.name,
            contactNo: customer.contactNo,
            email: customer.email,
            address: customer.address
          });
        },
        (error: any) => {
          console.error('Failed to retrieve customer:', error);
        }
      );
    } else {
      console.error('Customer number control not found or empty');
    }
  }
  
  


  addAll(){
    console.log(this.formData.value);
    
  }
}
