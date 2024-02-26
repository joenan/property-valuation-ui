import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../security/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authUser = this.authService.getAuthUser();
    if (authUser && authUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}