import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class AppService {

  private baseUrl: string = environment.appUrl;

  private http = inject(HttpClient);

  submitApplication(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}property-valuations`, data);
  }

   
}
