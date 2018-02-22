import { Component } from '@angular/core'
import { DashboardService } from "./dashboard.service";
import { AuthState } from "../../../api-client/authentication/authState";
import { HttpResponse } from "@angular/common/http";
import { UserViewModel } from "../../../api-client/webservices/models";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClient } from "@angular/common/http";

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class Dashboard {

    public userViewModel: UserViewModel = {
        UserId: '',
        FirstName: '',
        LastName: '',
        Email: ''
    };
    private errorMessage: string;
    public constructor(
        private dashboardService: DashboardService,
        private authState: AuthState,
        private http: HttpClient) {
    }
    private handleError(error: HttpResponse<string>) {
        return Observable.throw(error || 'Server error');
    }
    public everySecond(everySecond: string) {
        alert(everySecond);
    }

    public getUserDetails(): void {
        this.dashboardService.UserDetails(this.authState.token.userName)
            .subscribe((loginResult: HttpResponse<UserViewModel>) =>
                this.userViewModel = loginResult.body,
            error => this.errorMessage = <any>error);
    }
}