import { Component } from '@angular/core'
import { LoginModel } from "./login.model";
import { AuthenticaitonService, LoginResult } from "../../../api-client/authentication/authentication.service";
import { AuthState } from "../../../api-client/authentication/authState";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.css']
})
export class LoginComponent {

    public loginResult: LoginResult;
    public loginModel: LoginModel;
    public errorMessage: string;
    public constructor(
        private authenticaitonService: AuthenticaitonService,
        private authState: AuthState,
        private router: Router) {
        this.loginModel = new LoginModel();
        this.loginResult = new LoginResult();
    }

    public onSubmit(): void {
        this.authenticaitonService.login(this.loginModel.UserId, this.loginModel.Password)
            .subscribe(loginResult => {
                this.authState.token = loginResult;
                this.router.navigate(['/dashboard']);
            },
            error => this.errorMessage = <any>error);
    }
}