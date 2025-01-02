import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PatientRepository } from "../../domain/repositories/patient.repository";
import { Injectable } from "@angular/core";
import { DPIResponse } from "../entities/dpi-response.entity";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PatientImplementationRepository extends PatientRepository {

  constructor(private http: HttpClient) {
    super();
  }

  override async getDPI(): Promise<DPIResponse> {
    
    const accessToken=localStorage.getItem('token_access')
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    });
    
    const response = await firstValueFrom(
      this.http.get<DPIResponse>(`http://127.0.0.1:8000/api/mon-dossier/`,{headers})
    );
    return response;
  }
}