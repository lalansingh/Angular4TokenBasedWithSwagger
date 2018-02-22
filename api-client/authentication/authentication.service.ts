
import { Injectable } from "@angular/core";
//import { Response, Headers } from '@angular/http';
import { IPromise } from "@types/q";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable()
export class AuthenticaitonService {
    private resourceUrl: string = '/token';
    private baseUrl: string = 'http://localhost:61591/';
    constructor(private http: HttpClient) {
    }
    private handleError(error: HttpResponse<string>) {
        return Observable.throw(error || 'Server error');
    }
    login(userName: string, password: string): Observable<LoginResult> {
        return this.http
            .post(this.buildServiceUrl(this.baseUrl, this.resourceUrl),
            `grant_type=password&userName=${userName}&password=${password}&client_id=rnd`)
            .map((response: HttpResponse<LoginResult>) => response)
            .catch(this.handleError)
    }
    public refreshToken(refreshToken: string): Observable<LoginResult> {
        return this.http
            .post(this.buildServiceUrl(this.baseUrl, this.resourceUrl),
            `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=rnd`)
            .map((response: HttpResponse<LoginResult>) => response)
            .catch(this.handleError)
    }
    private buildServiceUrl(baseUrl: string, resourceUrl: string, queryParams?: any): string {
        let url: string = baseUrl;
        let baseUrlSlash: boolean = url[url.length - 1] === '/';
        let resourceUrlSlash: boolean = resourceUrl[0] === '/';
        if (!baseUrlSlash && !resourceUrlSlash) {
            url += '/';
        }
        else if (baseUrlSlash && resourceUrlSlash) {
            url = url.substr(0, url.length - 1);
        }
        url += resourceUrl;
        if (queryParams) {
            let isFirst: boolean = true;
            for (let p in queryParams) {
                if (queryParams.hasOwnProperty(p) && queryParams[p]) {
                    let separator: string = isFirst ? '?' : '&';
                    url += `${separator}${p}=${encodeURI(queryParams[p])}`;
                    isFirst = false;
                }
            }
        }
        return url;
    }
}

export class LoginResult {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    'as:client_id': string;
    userName: string;
    '.issued': Date;
    '.expires': Date;
}