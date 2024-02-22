import { Injectable, inject } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Customer } from '../model/customer';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private domain: string = environment.propertyUrl;
  private http = inject(HttpClient)
  constructor(private _apiService: ApiService) {}

  public createCustomer(payload: Customer): Observable<Customer> {
    return this._apiService.add<Customer>(`${this.domain}customers`, payload);
  }

  public retrieveCustomers(page: number, size: number): Observable<Customer[]> {
    return this._apiService.getPage<Customer[]>(
      `${this.domain}customers`,
      page,
      size
    );

  }

  public retrieveCustomerByCustomerNumber(
    Customer_id: any
  ): Observable<Customer> {
    // return this._apiService.getById<Customer>(
    //   `${this.domain}customers`,
    //   Customer_id
    // );
    return this.http.get(`http://63.250.53.24:9094/customers/${Customer_id}`)
    .pipe(
      map(res => res as Customer)
    )
  }

  public updateCustomerByCustomerId(
    customer_id: any,
    payload: Customer
  ): Observable<Customer> {
    return this._apiService.updateById<Customer>(
      `${this.domain}customers`,
      customer_id,
      payload
    );
  }

  public partialUpdateCustomerByCustomerId(
    customer_id: any,
    payload: Customer
  ): Observable<Customer> {
    return this._apiService.partialUpdateById<Customer>(
      `${this.domain}customers`,
      customer_id,
      payload
    );
  }

  public deleteCustomerByCustomerId(customer_id: any): Observable<any> {
    return this._apiService.delete(`${this.domain}customers`, customer_id);
  }
}
