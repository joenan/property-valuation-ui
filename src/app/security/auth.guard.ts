import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { of, Observable, take, map, tap, delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../store';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _store: Store
  ) {}

  canMatch() {
    return this.implementActivateGuard;
        // return this._authService.isLogin$.pipe(
        //   delay(2),
        //   tap((isAuthenticated) =>
        //     console.log("AuthGuard: isAuthenticated =", isAuthenticated)
        //   ),
        //   map((isAuthenticated) => {
        //     console.log(
        //       "############## IS AUTHENTICATED ###############",
        //       isAuthenticated
        //     );
        //     if (isAuthenticated) return true;

        //     this._router.navigate([""]);
        //     return false;
        //   })
        // );
  }

  canActivate() {
    return this.implementActivateGuard;
  }

  canDeactivate() {}

  /**
   * @description using the store to check if your is authenticated or not
   * @returns Observable<boolean>
   */
  get implementActivateGuard(): Observable<boolean> {
        return this._store.select(selectIsAuthenticated).pipe(
          take(1),
          map((isAuthenticated) => {
            // if (isAuthenticated) return true;

            // if (!isAuthenticated && !this._authService.isLogIn)
            //   return true;

            // this._router.navigate([""]);
            // return false;
            return true;
          })
        );
  }
  // return of(true);
// }
}


