
import { BaseState, StateType } from "./baseState";
import { Injectable } from "@angular/core";
import { LoginResult } from "./authentication.service";

@Injectable()
export class AuthState extends BaseState {
    constructor() {
        super([
            { name: 'token', type: StateType.session }
        ]);
    }
    public get token(): LoginResult {
        return this.getState<LoginResult>('token');
    }

    public set token(value: LoginResult) {
        this.setState<LoginResult>('token', value);
    }
}