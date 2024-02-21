import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { LoginResponse } from "../utils/LoginResponse";
import { Constants } from "../utils/constants";
import { ApiService } from "../shared/services/api.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserToken } from "../utils/User-Token";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isLogin$ = new BehaviorSubject<boolean>(false);
  private _errorStatus$ = new BehaviorSubject<boolean>(false);
  private _tokenDetail$ = new BehaviorSubject<Partial<UserToken>>({});
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  isLogin$ = this._isLogin$.asObservable();
  errorStatus$ = this._errorStatus$.asObservable();
  tokenDetail$ = this._tokenDetail$.asObservable();
  isLoading$ = this._isLoading$.asObservable();

  constructor(
    private _apiService: ApiService,
    private _jwtHelper: JwtHelperService,
    private _router: Router
  ) {
    console.log(
      "############## INSIDE AUTH-SERVICE-CONSTRUCTOR : IS-LOGIN ###############",
      this.isLogIn
    );
    this._isLogin$.next(true);
    // this._tokenDetail$.next(this.tokenDetail);
  }

  signIn(payload: any): Observable<LoginResponse> {
    return this._apiService.login(payload).pipe(
      map((response: LoginResponse) => {
        let token = response.token;
        localStorage.setItem(Constants.ACCESS_TOKEN, token);

        this.updateLoginStatus();
        console.log(
          "############## INSIDE SIGN-UP : IS-LOGIN  ###############",
          true
        );
        // this._router.navigate(["app"]);
        return response;
      })
    );
  }

  //check validity of token
  get isLogIn() {
    let isExpired = true;
    let token = this.getToken;

    if (!token) {
      console.log(
        "############## INSIDE IS-LOGIN : TOKEN-EMPTY ###############"
      );
      return false;
    }

    isExpired = this._jwtHelper.isTokenExpired(token).valueOf() as boolean;

    if (isExpired) {
      console.log(
        "############## INSIDE IS-LOGIN : TOKEN-EXPIRED ###############"
      );
      this.removeStorageState();
      return false;
    }

    return true;
  }

  removeStorageState() {
    localStorage.removeItem(Constants.ACCESS_TOKEN);
  }

  //get token detail from decoded jwt
  get tokenDetail(): UserToken {
    return this._jwtHelper.decodeToken() as UserToken;
  }

  get getToken(): string {
    return localStorage.getItem(Constants.ACCESS_TOKEN) as string;
  }

  private updateLoginStatus() {
    console.log("############# Updating login status #################", this.isLogIn);
    this._isLogin$.next(this.isLogIn);
  }
}



