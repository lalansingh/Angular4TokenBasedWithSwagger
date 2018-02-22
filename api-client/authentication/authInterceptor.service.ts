
import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http"
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpEvent } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthState } from "./authState";
import { LoginResult, AuthenticaitonService } from "./authentication.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    private errorMessage: string;
    private loginResult: LoginResult;
    private authenticaitonService: AuthenticaitonService;
    constructor(
        private authState: AuthState,
        private injector: Injector) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authenticaitonService = this.injector.get(AuthenticaitonService);
        let token: LoginResult = this.authState.token;
        if (Boolean(token) && ((request.url.indexOf('/api') > 0)
            && (request.url.indexOf('/token') < 0))) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.access_token}`
                }
            });
        }
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if ((event.url.indexOf('/api') > 0)
                    && (event.url.indexOf('/token') < 0)) {
                    this.authenticaitonService.refreshToken(token.refresh_token)
                        .subscribe(loginResult =>
                            this.authState.token = loginResult,
                        error => this.errorMessage = <any>error);
                }
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // redirect to the login route
                    // or show a modal
                }
            }
        });
    }
}