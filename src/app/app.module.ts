import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeComponent } from "./layouts/home/home.component";
import { NgModule, isDevMode } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { SecurityModule } from "./security/security.module";
import { AuthInterceptorProvider } from "./interceptors/auth.interceptor";
import { Constants } from "./utils/constants";
import { AuthService } from "./security/auth.service";
import { CommonModule } from "@angular/common";
import { environment } from "src/environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserModule } from "@angular/platform-browser";
import { AuthEffects, reducers } from "./store";

export function tokenGetter() {
  return localStorage.getItem(Constants.ACCESS_TOKEN);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SecurityModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.authBaseurl],
        disallowedRoutes: [],
      },
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers),
    // StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    // StoreRouterConnectingModule.forRoot({
    //   stateKey: "router",
    //   routerState: RouterState.Minimal,
    // }),
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
