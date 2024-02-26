import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class SettingsService {

  private baseUrl: string = environment.settingBaseurl;
  private http = inject(HttpClient);

  // CRUD methods for Category

  createCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}categories`, category);
  }

  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}categories/${categoryId}`);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}categories/${categoryId}`);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}categories`);
  }

  // CRUD methods for Currency

  createCurrency(currency: any): Observable<any> {
    return this.http.post(`${this.baseUrl}currencies`, currency);
  }

  getCurrencyById(currencyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}currencies/${currencyId}`);
  }

  deleteCurrency(currencyId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}currencies/${currencyId}`);
  }

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}currencies`);
  }

  // CRUD methods for Facility

  createFacility(facility: any): Observable<any> {
    return this.http.post(`${this.baseUrl}facilities`, facility);
  }

  getFacilityById(facilityId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}facilities/${facilityId}`);
  }

  deleteFacility(facilityId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}facilities/${facilityId}`);
  }

  getAllFacilities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}facilities`);
  }

  // CRUD methods for Purpose

  createPurpose(purpose: any): Observable<any> {
    return this.http.post(`${this.baseUrl}purposes`, purpose);
  }

  getPurposeById(purposeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}purposes/${purposeId}`);
  }

  deletePurpose(purposeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}purposes/${purposeId}`);
  }

  getAllPurposes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}purposes`);
  }

  // CRUD methods for Valuation Type

  createValuationType(valuationType: any): Observable<any> {
    return this.http.post(`${this.baseUrl}types`, valuationType);
  }

  getValuationTypeById(valuationTypeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}types/${valuationTypeId}`);
  }

  deleteValuationType(valuationTypeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}types/${valuationTypeId}`);
  }

  getAllValuationTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}types`);
  }


}
