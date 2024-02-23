
import { BehaviorSubject, Observable, map } from "rxjs";
import { LoginResponse } from "../utils/LoginResponse";
import { Constants } from "../utils/constants";
import { ApiService } from "../shared/services/api.service";
import { UserToken } from "../utils/User-Token";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isLogin$ = new BehaviorSubject<boolean>(false);
  private _errorStatus$ = new BehaviorSubject<boolean>(false);
  private _tokenDetail$ = new BehaviorSubject<Partial<UserToken>>({});
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _userDetails$ = new BehaviorSubject<Partial<LoginResponse>>({})

  isLogin$ = this._isLogin$.asObservable();
  errorStatus$ = this._errorStatus$.asObservable();
  tokenDetail$ = this._tokenDetail$.asObservable();
  isLoading$ = this._isLoading$.asObservable();
  userDetails$ = this._userDetails$.asObservable();

  constructor(
    private _apiService: ApiService,
    private _jwtHelper: JwtHelperService,
    private _router: Router
  ) {
    console.log(
      "############## INSIDE AUTH-SERVICE-CONSTRUCTOR : IS-LOGIN ###############",
      this.isLogIn
    );
    // this._isLogin$.next(true);
    // this._tokenDetail$.next(this.tokenDetail);
        // Initialize user details from local storage when the service is instantiated
        const userDetails = localStorage.getItem('userDetails');
        console.log('User Details from Local Storage:', userDetails);
        if (userDetails) {
          this._userDetails$.next(JSON.parse(userDetails));
        }
  }

  signIn(payload: any): Observable<LoginResponse> {
    return this._apiService.login(payload).pipe(
      map((response: LoginResponse) => {
        this._userDetails$.next(response)
        console.log(response,'hello in service');
        localStorage.setItem('userDetails', JSON.stringify(response));
        
        return response;
      })
    );
  }

  //check validity of token
  get isLogIn() {
    let isExpired = true;
    let token = this.getToken;

    if (!token) {
      return false;
    }

    isExpired = this._jwtHelper.isTokenExpired(token).valueOf() as boolean;

    if (isExpired) {
      this.removeStorageState();
      return false;
    }

    return true;
  }

  removeStorageState() {
    localStorage.removeItem(Constants.ACCESS_TOKEN);
  }
  getUserDetails(): Observable<Partial<LoginResponse>> {
    return this._userDetails$.asObservable();
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

  getUserIdFromToken(): string {
    const token = localStorage.getItem("access_token")!;
    const decodedToken = this._jwtHelper.decodeToken(token);
    return decodedToken.userId;
  }
}



