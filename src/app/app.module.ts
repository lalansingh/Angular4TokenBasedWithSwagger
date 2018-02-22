import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from "./login/login.component";
import { LoginApiService } from "./login/login.service";
import { AuthenticaitonService } from "../../api-client/authentication/authentication.service";
import { AuthInterceptorService } from "../../api-client/authentication/authInterceptor.service";
import { AuthState } from "../../api-client/authentication/authState";
import { Dashboard } from "./dashboard/dashboard.component";
import { DashboardService } from "./dashboard/dashboard.service";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiClientService } from "../../api-client/webservices/index";
import { NumFormate } from "../../api-client/common/directives/numformate.directive";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Dashboard,
    NumFormate
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      //{ path: '**', redirectTo: 'login', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
    ])
  ],
  providers: [LoginApiService,
    AuthenticaitonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    ApiClientService,
    AuthState,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
