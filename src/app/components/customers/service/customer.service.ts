import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private _apiService: ApiService) { }

  getCustomers(payload: any){
    return this._apiService.getCustomer(payload)
    .pipe(
      map(res => {})
    )
  }
}
