import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AppError } from 'src/app/errors/app.error';
import { BadRequestError } from 'src/app/errors/bad-request.error';
import { ForbiddenError } from 'src/app/errors/forbidden.error';
import { NotFoundError } from 'src/app/errors/not-found.error';
import { ServerResponseError } from 'src/app/errors/server-response.error';
import { UnauthorizedError } from 'src/app/errors/un-authorized.error';
import { Customer } from 'src/app/model/customer';
import { LoginResponse } from 'src/app/utils/LoginResponse';
import { Constants } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private _http = inject(HttpClient);
  private domain: string = environment.authBaseurl;
  private propertyDomain: string = environment.propertyUrl;
  private readonly DELETED_SUCCESSFULLY = "deleted successfully";

  constructor() {}

  login(payload: any): Observable<LoginResponse> {
    return this._http
      .post<LoginResponse>(`${this.domain}v1/auth/signin`, payload)
      .pipe(
        map((res: LoginResponse) => res),
        catchError(this.handleError)
      );
  }

  getCustomer(payload: any): Observable<Customer[]> {
    let params = new HttpParams().set("page", 0).set("size", 40);

    return this._http
      .get<Customer[]>(`${this.domain}/customers`, { params: params })
      .pipe(
        map((res: Customer[]) => res),
        catchError(this.handleError)
      );
  }

  get<T>(url: string): Observable<T> {
    return this._http.get<T>(`${url}`).pipe(
      map((response) => response as T),
      catchError(this.handleError)
    );
  }

  getAll<T>(url: string): Observable<T> {
    return this._http.get<T>(`${url}`).pipe(
      map((response) => response as T),
      catchError(this.handleError)
    );
  }

  getById<T>(id: any, url: string): Observable<T> {
    return this._http.get<T>(`${url}${id}`).pipe(
      map((reponse) => reponse as T),
      catchError(this.handleError)
    );
  }

  getPage<T>(
    url: string,
    page: number,
    size: number
  ): Observable<T> {
    let params = new HttpParams()
    .set("page", page)
    .set("size", size);

    return this._http.get<T>(`${url}`, { params: params }).pipe(
      map((reponse) => reponse as T),
      catchError(this.handleError)
    );
  }

  add<T>(url: string, data: any): Observable<T> {
    return this._http.post<T>(`${url}`, data).pipe(
      map((response) => {
        return response as T;
      }),
      catchError(this.handleError)
    );
  }

  addById<T>(url: string, id: any, data: any): Observable<T> {
    return this._http.post<T>(`${url}${id}`, data).pipe(
      map((reponse) => reponse as T),
      catchError(this.handleError)
    );
  }

  update<T>(url: string, data: any): Observable<T> {
    return this._http.put<T>(`${url}`, data).pipe(
      map((response) => response as T),
      catchError(this.handleError)
    );
  }

  updateById<T>(url: string, id: any, data: any): Observable<T> {
    return this._http.put<T>(`${url}${id}`, data).pipe(
      map((response) => response as T),
      catchError(this.handleError)
    );
  }

  partialUpdateById<T>(url: string, id: any, data: any): Observable<T> {
    return this._http.patch<T>(`${url}${id}`, data).pipe(
      map((response) => response as T),
      catchError(this.handleError)
    );
  }

  delete(url: string, id: any): Observable<any> {
    return this._http.delete(`${url}${id}`).pipe(
      map(() => this.DELETED_SUCCESSFULLY),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const _error = {
      status: error.status,
      detail: error.error?.detail,
      message: error.error?.message,
    };

    const forbiddenError = {
      status: error?.status,
      message: error?.message,
    };

    switch (error.status) {
      case 400:
        return throwError(() => new BadRequestError(_error));
      case 401:
        return throwError(() => new UnauthorizedError(_error));
      case 403:
        return throwError(() => new ForbiddenError(forbiddenError));
      case 404:
        return throwError(() => new NotFoundError(_error));
      case 500:
        return throwError(() => new ServerResponseError(_error));
      case 0:
        return throwError(() => new AppError("Connection Error! try again"));
      default:
        return throwError(() => new AppError(error.message));
    }
  }
}
