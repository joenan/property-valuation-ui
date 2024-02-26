import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { SecurityModule } from "./security/security.module";
import { Constants } from "./utils/constants";
import { environment } from "src/environments/environment";
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserModule } from "@angular/platform-browser";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export function tokenGetter() {
  return localStorage.getItem(Constants.ACCESS_TOKEN);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SecurityModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.authBaseurl],
        disallowedRoutes: [],
      },
    }),
    NgbModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
