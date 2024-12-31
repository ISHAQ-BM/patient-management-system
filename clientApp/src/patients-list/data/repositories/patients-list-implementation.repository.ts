import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PatientsListRepository } from "../../domain/repositories/patients-list.repository";
import { firstValueFrom } from "rxjs";
import { SearchPatientResponse } from "../entities/search-response.entity";

@Injectable({
    providedIn: 'root',
})
export class PatientsListImplementationRepository extends PatientsListRepository {


     constructor(private http: HttpClient) {
        super();
    }

   override async searchDPI(params: string | null): Promise<SearchPatientResponse> {
  const accessToken = localStorage.getItem('token_access');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  });

  const httpParams = new HttpParams().set('nss', params || '');

  try {
    const response = await firstValueFrom(
      this.http.get<SearchPatientResponse>('http://127.0.0.1:8000/api/Med_Patient/RechercheNSS/', {
        headers,
        params: httpParams
      })
    );
    return response;
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error('Patient not found. Please check the NSS.');
    } else if (error.status === 401) {
      throw new Error('Unauthorized. Please log in again.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
}

    
   


    

    
    
}