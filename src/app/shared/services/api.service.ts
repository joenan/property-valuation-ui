import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AppError } from 'src/app/errors/app.error';
import { BadRequestError } from 'src/app/errors/bad-request.error';
import { ForbiddenError } from 'src/app/errors/forbidden.error';
import { NotFoundError } from 'src/app/errors/not-found.error';
import { ServerResponseError } from 'src/app/errors/server-response.error';
import { UnauthorizedError } from 'src/app/errors/un-authorized.error';
import { LoginResponse } from 'src/app/utils/LoginResponse';
import { Constants } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private _http = inject(HttpClient);
  private domain: string = environment.authBaseurl;

  constructor() {}

  login(payload: any): Observable<LoginResponse> {
    return this._http
      .post<LoginResponse>(`${this.domain}v1/auth/signin`, payload)
      .pipe(
        map((res: LoginResponse) => res),
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
