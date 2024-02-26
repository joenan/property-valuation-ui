import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class ReportService {

  private baseUrl: string = environment.reportUrl;

  private http = inject(HttpClient);

  getValuationReports(): Observable<any> {
    return this.http.post(`${this.baseUrl}reports/pvs-valuation-request`, {});
  }

  getValuationReportsBySearchParam(reference: string, createdAt: any, fosRef: string): Observable<any> {
    let searchParams: any = {};

    // Check and include reference parameter
    if (reference && reference.trim() !== '') {
      searchParams.reference = reference;
    }

    // Check and include createdAt parameter
    if (createdAt) {
      searchParams.createdAt = createdAt;
    }

    // Check and include fosRef parameter
    if (fosRef && fosRef.trim() !== '') {
      searchParams.fosRef = fosRef;
    }

    // Make the HTTP request
    return this.http.post(`${this.baseUrl}reports/pvs-valuation-request`, searchParams);
  }
}
