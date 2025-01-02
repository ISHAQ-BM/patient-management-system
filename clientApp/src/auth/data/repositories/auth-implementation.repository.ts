import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { LoginResponse } from "../entities/login-response.entity";


@Injectable({
    providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {



    constructor(private http: HttpClient) {
        super();
    }

    

    override async login(params: {username:string,password:string}): Promise<LoginResponse> {
        const response = await firstValueFrom(
            this.http.post<LoginResponse>('http://127.0.0.1:8000/api/auth/login_view/', params)    
        );
        localStorage.setItem('role',response.user.role)
        localStorage.setItem('username',`${response.user.first_name} ${response.user.last_name} `)
        localStorage.setItem('token_access', response.tokens.access)
        localStorage.setItem('id',response.user.id.toString())
        localStorage.setItem('refresh', response.tokens.refresh)
        return response;
    }

    





    async logout(): Promise<{}> {
    let refresh = localStorage.getItem('refresh');
    let accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    try {
      
      const response = await firstValueFrom(
        this.http.post<string>('http://127.0.0.1:8000/api/auth/logout_view/', { refresh }, { headers })
      );
      localStorage.clear(); 
      return response;
    } catch (error: any) {
      if (error.status === 403) {
        console.error('Access token expired. Refreshing token...');
        
        
        try {
          const refreshResponse = await firstValueFrom(
            this.http.post<{ refresh: string ,access:string}>(
              'http://127.0.0.1:8000/api/token/refresh/',
              { refresh },
              { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
            )
          );


          accessToken = refreshResponse.access;
          refresh = refreshResponse.refresh;
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh', refresh);

          const retryHeaders = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          });

          const retryResponse = await firstValueFrom(
            this.http.post<string>('http://127.0.0.1:8000/api/auth/logout_view/', { refresh }, { headers: retryHeaders })
          );

          localStorage.clear(); 
          return retryResponse;
        } catch (refreshError: any) {
          console.error('Failed to refresh token:', refreshError);
          throw refreshError; 
        }
      } else {
        console.error('Logout failed:', error);
        throw error; 
      }
    }
  }



    override isAuthenticated(): boolean {
        const token = localStorage.getItem('token_access');
        return token !== null;  ;
    }
    
    
}