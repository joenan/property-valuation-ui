import { Action, createReducer, on } from "@ngrx/store";
import { AuthState } from "../states/auth.state";
import { loginFailure, loginSuccess, setAuthenticated, setUnAuthenticed, startAuthLoading } from "../actions/auth.actions";

export const authFeatureKey = "auth";

const initialState: AuthState = {
  // user: undefined,
  token: undefined,
  isAuthenticated: false,
  isloading: false,
  errorMsg: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(setAuthenticated, (state) => ({ ...state, isAuthenticated: true })),
  on(setUnAuthenticed, (state) => ({ ...state, isAuthenticated: false })),
  on(startAuthLoading, (state) => ({ ...state, isloading: true })),
  on(loginSuccess, (state, action) => {
    console.log("========== INSIDE REDUCER ===========")
    return {
      ...state,
      isAuthenticated: true,
      isloading: false,
      token: action.token,
    };
  }
  ),
  on(loginFailure, (state, action) => ({
    ...state,
    isloading: false,
    errorMsg: action.errorMsg,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
