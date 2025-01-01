import { Injectable } from '@angular/core';
import { LoginResponse } from '../../data/entities/login-response.entity';

@Injectable({
    providedIn: 'root',
})
export abstract class AuthRepository {
    abstract login(params: {username:string,password:string}): Promise<LoginResponse>;
    abstract logout():Promise<{}>;
    abstract isAuthenticated():boolean;

}