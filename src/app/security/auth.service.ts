
import { map } from "rxjs";
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {


  baseUrl = environment.authBaseurl;
  private http = inject(HttpClient);

  login(data: any) {
    return this.http.post(`${this.baseUrl}v1/auth/signin`, data)
      .pipe(map(result => {
        localStorage.setItem('authUser', JSON.stringify(result));
        return result;
      }));
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}v1/auth/signup`, data);
  }


  getAuthUser() {
    return JSON.parse(localStorage.getItem('authUser') as string);
  }

  get isLoggedIn() {
    if (localStorage.getItem('authUser')) {
      return true;
    }
    return false;
  }
}



