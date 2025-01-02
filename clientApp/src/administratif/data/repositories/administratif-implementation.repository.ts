import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { AdministratifRepository } from "../../domain/repositories/administratif.repository";
import { CreateDPIResponse } from "../entities/create-dpi-response.entity";


@Injectable({
    providedIn: 'root',
})
export class AdministratifImplementationRepository extends AdministratifRepository {



    

    constructor(private http: HttpClient) {
        super();
        
    }

    
override async createDPI(params: {
  user: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  };
  patient: {
    numero_securite_sociale: string;
    date_naissance: string;
    adresse: string;
    telephone: string;
    mutuelle: string;
    personne_contact_nom: string;
    personne_contact_telephone: string;
  };
}): Promise<CreateDPIResponse> {
  let accessToken = localStorage.getItem('access_token');
  let refresh = localStorage.getItem('refresh');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  });

  try {
    const response = await firstValueFrom(
      this.http.post<CreateDPIResponse>(
        'http://127.0.0.1:8000/api/personnel/creer_DPI/',
        params,
        { headers }
      )
    );
    return response;
  } catch (error: any) {
    if (error.status === 403) {
      console.error('Access token expired. Refreshing token...');

      try {
        const refreshResponse = await firstValueFrom(
          this.http.post<{ refresh: string; access: string }>(
            'http://127.0.0.1:8000/api/token/refresh/',
            { refresh },
            {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            }
          )
        );

        accessToken = refreshResponse.access;
        refresh = refreshResponse.refresh;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh', refresh);

        const retryHeaders = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        });

        const retryResponse = await firstValueFrom(
          this.http.post<CreateDPIResponse>(
            'http://127.0.0.1:8000/api/personnel/creer_DPI/',
            params,
            { headers: retryHeaders }
          )
        );
        return retryResponse;
      } catch (refreshError: any) {
        console.error('Failed to refresh token:', refreshError);
        throw refreshError;
      }
    } else {
      console.error('Create DPI failed:', error);
      throw error;
    }
  }
}

    
    
}