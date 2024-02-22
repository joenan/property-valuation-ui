import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AuthService } from "src/app/security/auth.service";
import { loginFailure, loginSuccess, logout, setUnAuthenticed, startAuthLoading, startLogin } from "../actions/auth.actions";
import { catchError, map, tap, switchMap, delay } from "rxjs";
import { Constants } from "src/app/utils/constants";

@Injectable()
export class AuthEffects {
  private readonly ACCESS_TOKEN = "access_token";

  constructor(
    private actions$: Actions,
    private _store: Store,
    private _authService: AuthService,
    private _router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startLogin),
      delay(2000),
      tap(() => {
        console.log("========= starting Login ==============")
        this._store.dispatch(startAuthLoading());
      }),
      switchMap((action) =>
        this._authService.signIn(action.credential).pipe(
          map((res) => {
            let token = res.token;
            localStorage.setItem(Constants.ACCESS_TOKEN, token);

            console.log("========= After Login response ==============");
            this._router.navigate(['/app']);
            return token;
          }),
          map((token) => loginSuccess({ token: token })),
          catchError((error) => {
            return [loginFailure({ errorMsg: error })];
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem(this.ACCESS_TOKEN);
        this._router.navigate([""]);
      }),
      switchMap(() => {
        return [setUnAuthenticed()];
      })
    )
  );
}


