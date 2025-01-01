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
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string
  },
  patient: {
    numero_securite_sociale: string,
    date_naissance: string,
    adresse: string,
    telephone: string,
    mutuelle: string,
    personne_contact_nom: string,
    personne_contact_telephone: string,
    medcin_traitant:string
  }
}): Promise<CreateDPIResponse> {
    const accessToken=localStorage.getItem('token_access')
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
});

        const response = await firstValueFrom(
            this.http.post<CreateDPIResponse>('http://127.0.0.1:8000/api/personnel/creer_DPI/', params,{headers})    
        );
        return response;
    }


    
    
}