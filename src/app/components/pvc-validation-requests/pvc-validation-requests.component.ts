import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ReportService } from "src/app/services/report.service";

@Component({
  selector: "app-pvc-validation-requests",
  templateUrl: "./pvc-validation-requests.component.html",
  styleUrls: ["./pvc-validation-requests.component.css"],
})
export class PvcValidationRequestsComponent {

  model: NgbDateStruct | undefined;
  date: { year: number, month: number } | null = null;

  searchParams = {
    reference: "",
    createdAt: "",
    fosRef: ""
  };
  reports: any = [];

  constructor(private router: Router,
    private reportService: ReportService,
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService,
  ) {
    this.getPvsValuationReports();
  }

  getPvsValuationReports() {
    this.spinner.show();
    this.reportService
      .getValuationReports()
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.reports = res;
        },
        error: (err) => {
          this.spinner.hide();
          // Handle errors
        },
        complete: () => {
          // Handle completion if needed
        },
      });
  }

  goToPrevious() {
    this.router.navigate(["/app/comments"]);
  }

  search() {
    this.reportService
      .getValuationReportsBySearchParam(this.searchParams.reference, this.searchParams.createdAt, this.searchParams.fosRef)
      .subscribe({
        next: (res) => {
          this.reports = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          // Handle errors
        },
        complete: () => {
          // Handle completion if needed
        },
      });
  }
  

}
