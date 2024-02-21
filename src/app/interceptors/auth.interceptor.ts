import { ClsService } from "./../services/cls.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  auth_token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGlrZXppZTIyIiwiaWF0IjoxNzA4NDQxMzIyLCJleHAiOjE3MDg1Mjc3MjJ9.fSRCSyCutffR3GHjw-QReuVpdgJ2klUNhmxKWN9dt9gv-gAB6C7IdE9F_1mzHHQhrLKe-nTvkcbSO9B4jwqkZg";
  constructor(private signupService: ClsService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenRequest = request.clone({
      setHeaders: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth_token}`,
      },
    });
    return next.handle(tokenRequest);
  }
}
