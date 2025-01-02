import { Injectable } from "@angular/core";
import { UseCase } from "../../../base/domain/usecase/use-case";
import { AdministratifRepository } from "../repositories/administratif.repository";
import { CreateDPIResponse } from "../../data/entities/create-dpi-response.entity";

@Injectable({
    providedIn: 'root',
})
export class CreateDPIUseCase implements UseCase<{},CreateDPIResponse>{

    constructor(private administratifRepository: AdministratifRepository) { }

    execute(params: {
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
}): Promise<CreateDPIResponse> {
        return this.administratifRepository.createDPI(params);
    }
    
}