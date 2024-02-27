import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AppService } from "src/app/services/app.service";
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

  valuationTypes: any[] = [];
  facilityTypes: any[] = [];
  categories: any[] = [];
  purposes: any[] = [];
  currencies: any[] = [];
  formData: any = FormGroup;
  showBorrowerForm: boolean = false;
  showPropertyFacilityForm: boolean = true
  user: any;

  constructor(private customerService: CustomerService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private setting: SettingsService,
    private appService : AppService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { 
    this.user = JSON.parse(localStorage.getItem('authUser') ?? '{}');
  }

  ngOnInit(): void {
    this.fetchValuationTypes()
    this.fetchFacilityType()
    this.fetchCategoryType()
    this.fetchPurpose()
    this.fetchCurrency()
    this.createFormData();
  };


  createFormData() {

    this.formData = this.formBuilder.group({
      facilityType: ['NON_REVOLVING', Validators.required],
      category: ['PBWM_HOUSING', Validators.required],
      purpose: ['CONSTRUCTION', Validators.required],
      termMonths: ['', Validators.required],
      currency: ['MUR', Validators.required],
      amount: ['', Validators.required],
      fosReference: [{ value: '', disabled: true }],
      reference: [{ value: '', disabled: true }],
      evaluationType: ['EXISTING', Validators.required],
      borrowers: this.formBuilder.array([
        this.createBorrowerFormGroup()
      ])
    });

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
      customerNumber: [''],
      phoneNumber: [{ value: '', disabled: true }],
      shortName: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      streetAddress: [{ value: '', disabled: true }],
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
    this.showBorrowerForm = true
  }

  goToPrevious() {
    this.showPropertyFacilityForm = true
    this.showBorrowerForm = false
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
    this.setting.getAllPurposes().subscribe({
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
    this.spinner.show();
    const borrowerFormArray = this.formData.get('borrowers') as FormArray;
    const borrowerFormGroup = borrowerFormArray.at(borrowerIndex);
    const customerNumberControl = borrowerFormGroup.get('customerNumber');

    if (customerNumberControl && customerNumberControl.value) {
      const customerNumber = customerNumberControl.value;

      // Call the service to retrieve the customer by their number
      this.customerService.getCustomerByNumber(customerNumber).subscribe(
        (customer: any) => {
          // Update the form with the retrieved customer data
          borrowerFormGroup.patchValue({
            shortName: customer.shortName,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            streetAddress: customer.streetAddress
          });
          this.toastr.success('Customer details retrieved successfully!', 'Success', {
            timeOut: 2000
          });
          this.spinner.hide();
        },
       
        (error: any) => {
          this.spinner.hide();
          console.log(error)
          this.toastr.error(error?.error?.message);
        }
      );
    } else {
      this.spinner.hide();
      this.toastr.info("Customer number control not found or empty", "");
    }
  }

 
  saveAll(): void {
    // Access the form data
    this.spinner.show();
    const formData = this.formData.value;

    // Extract the facility details from the form data
    const facilityDetails = {
      facilityType: formData.facilityType,
      category: formData.category,
      currency: formData.currency,
      amount: formData.amount,
       
    };

    // Assign facilityDetails to formData
    formData.facilityDetails = facilityDetails;

    this.spinner.show();

      this.appService.submitApplication(formData).subscribe({
        next: response => {
          localStorage.setItem("propertyValuationId", response.id);
          this.toastr.success('Application submitted successfully!', 'Success', {
            timeOut: 2000
          });
          this.spinner.hide();
          this.router.navigate(["/app/comments"]);
        },
        error: error => {
          this.spinner.hide();
          this.toastr.error(error?.error?.message);
        },
        complete: () => {
          console.log('Complete: Valuation types fetched successfully.');
        }
      });
    }

  }
