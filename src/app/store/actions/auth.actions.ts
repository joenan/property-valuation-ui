import { createAction, props } from "@ngrx/store";

/**
 * Authentication state actions
 */
export const setAuthenticated = createAction("[Auth] Set Authenticated");
export const setUnAuthenticed = createAction("[Auth] Set Unauthenticad");
export const logout = createAction("[Auth] Logout");

/**
 * Login actions
 */
export const startLogin = createAction(
  "[Auth] Start Login",
  props<{ credential: any }>()
);

export const startAuthLoading = createAction("[Auth] Start Auth Loading");

export const loginSuccess = createAction(
  "[Auth] Successful Login",
  props<{ token: string }>()
);

export const loginFailure = createAction(
  "[Auth] Failed to Login",
  props<{ errorMsg: string }>()
);
