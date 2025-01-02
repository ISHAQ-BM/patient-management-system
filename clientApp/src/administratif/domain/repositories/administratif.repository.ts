import { Injectable } from "@angular/core";
import { CreateDPIResponse } from "../../data/entities/create-dpi-response.entity";

@Injectable({
    providedIn: 'root',
})
export abstract class AdministratifRepository {
    abstract createDPI(params: {
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
  }
}): Promise<CreateDPIResponse>;
    

}