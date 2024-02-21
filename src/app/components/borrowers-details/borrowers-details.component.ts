import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-borrowers-details",
  templateUrl: "./borrowers-details.component.html",
  styleUrls: ["./borrowers-details.component.css"],
})
export class BorrowersDetailsComponent {
  dynamicForm: any = FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  goToNext() {
    // this.router.navigate(["dashboard/initiators-details"]);
    this.router.navigate(["/app/comments"]);
  }

  goToPrevious() {
    this.router.navigate(["/app/initiators-details"]);
  }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      borrowers: this.formBuilder.array([
        this.createBorrowerGroup(), // Add one default borrower form
      ]),
    });
  }
  getBorrowerTitle(index: number): string {
    return index === 0 ? "Main Borrower" : `Joint Borrower - #${index}`;
  }
  get borrowers(): FormArray {
    return this.dynamicForm.get("borrowers") as FormArray;
  }

  createBorrowerGroup(): FormGroup {
    return this.formBuilder.group({
      customerNumber: "",
      contactNo: "",
      customerName: "",
      email: "",
      address: "",
    });
  }

  addBorrower(): void {
    this.borrowers.push(this.createBorrowerGroup());
  }

  removeBorrower(index: number): void {
    this.borrowers.removeAt(index);
  }
}
