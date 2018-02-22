
import { Injectable } from "@angular/core";
import { IPromise } from "@types/q";
import { ApiClientService } from "../../../api-client/webservices/index";
import { Observable } from "rxjs/Observable";
import { HttpResponse } from "@angular/common/http";
import { UserViewModel } from "../../../api-client/webservices/models";

@Injectable()
export class DashboardService {

    public constructor(private apiClientService: ApiClientService) {
    }

    public UserDetails(userId: string): Observable<HttpResponse<UserViewModel>> {
        return this.apiClientService.Login_UserDetails(userId);
    }
}