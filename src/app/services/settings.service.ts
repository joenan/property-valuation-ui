import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private domain: string = environment.settingBaseurl;

  constructor(private _apiService: ApiService) {}

  public getAllValuationTypes(): Observable<any[]> {
    return this._apiService.getAll<any[]>(`${this.domain}types`);
  }

  public getAllValuationPurpose(): Observable<any[]> {
    return this._apiService.getAll<any[]>(`${this.domain}purposes`);
  }

  public getAllFacilities(): Observable<any[]> {
    return this._apiService.getAll<any[]>(`${this.domain}facilities`);
  }

  public getAllCurrencies(): Observable<any[]> {
    return this._apiService.getAll<any[]>(`${this.domain}currencies`);
  }

  public getAllCategories(): Observable<any[]> {
    return this._apiService.getAll<any[]>(`${this.domain}categories`);
  }
}
