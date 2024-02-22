import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../states/auth.state";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectAuth = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

/**
 * selector to check authentication state
 * either true or false
 */
export const selectIsAuthenticated = createSelector(
  selectAuth,
  (state) => state
);

/**
 * selector to keep track of Login isLoading state
 * either true or false
 */
export const selectAuthIsLoading = createSelector(
  selectAuthState,
  (state) => state.isloading
);

/**
 * selector retrieve Authenticated User
 * either an AppUser or undefined
 */
export const selectUser = createSelector(
  selectAuthState,
  // (state) => state.user
  (state) => state
);

/**
 * selector check for error in Login attempt
 * either a message or undefined
 */
export const selectError = createSelector(
  selectAuthState,
  (state) => state.errorMsg
);
