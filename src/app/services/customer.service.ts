import { Injectable, inject } from '@angular/core';
import { Customer } from '../model/customer';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private baseUrl: string = environment.appUrl;
  private http = inject(HttpClient)

  createCustomer(customer: Customer): Observable<any> {
    return this.http.post(`${this.baseUrl}customers`, customer);
  }

  // Get customer by customer number
  getCustomerByNumber(customerNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}customers/${customerNumber}`);
  }

  // Delete customer by customer number
  deleteCustomer(customerNumber: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}customers/${customerNumber}`);
  }

  // Get all customers
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<any[]>(`${this.baseUrl}customers`);
  }

}
