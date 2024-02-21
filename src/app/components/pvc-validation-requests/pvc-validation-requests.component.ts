import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-pvc-validation-requests",
  templateUrl: "./pvc-validation-requests.component.html",
  styleUrls: ["./pvc-validation-requests.component.css"],
})
export class PvcValidationRequestsComponent {
  constructor(private router: Router) {}

  goToPrevious() {
    this.router.navigate(["/app/comments"]);
  }

  tableData: any[] = [
    {
      reference: "Ref-1",
      receivedOn: "2024-02-01",
      borrowersName: "Borrower-1",
      fosRef: "FOS-1",
      createdOn: "2024-02-01",
    },
    {
      reference: "Ref-2",
      receivedOn: "2024-02-02",
      borrowersName: "Borrower-2",
      fosRef: "FOS-2",
      createdOn: "2024-02-02",
    },
    {
      reference: "Ref-3",
      receivedOn: "2024-02-03",
      borrowersName: "Borrower-3",
      fosRef: "FOS-3",
      createdOn: "2024-02-03",
    },
    {
      reference: "Ref-4",
      receivedOn: "2024-02-04",
      borrowersName: "Borrower-4",
      fosRef: "FOS-4",
      createdOn: "2024-02-04",
    },
    {
      reference: "Ref-5",
      receivedOn: "2024-02-05",
      borrowersName: "Borrower-5",
      fosRef: "FOS-5",
      createdOn: "2024-02-05",
    },
    {
      reference: "Ref-6",
      receivedOn: "2024-02-06",
      borrowersName: "Borrower-6",
      fosRef: "FOS-6",
      createdOn: "2024-02-06",
    },
    {
      reference: "Ref-7",
      receivedOn: "2024-02-07",
      borrowersName: "Borrower-7",
      fosRef: "FOS-7",
      createdOn: "2024-02-07",
    },
    {
      reference: "Ref-8",
      receivedOn: "2024-02-08",
      borrowersName: "Borrower-8",
      fosRef: "FOS-8",
      createdOn: "2024-02-08",
    },
    {
      reference: "Ref-9",
      receivedOn: "2024-02-09",
      borrowersName: "Borrower-9",
      fosRef: "FOS-9",
      createdOn: "2024-02-09",
    },
    {
      reference: "Ref-10",
      receivedOn: "2024-02-10",
      borrowersName: "Borrower-10",
      fosRef: "FOS-10",
      createdOn: "2024-02-10",
    },
  ];
}
