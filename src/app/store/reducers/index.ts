import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { routerReducer } from "@ngrx/router-store";
import { authReducer } from "./auth.reducers";
import { isDevMode } from "@angular/core";

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode()
  ? []
  : [];
