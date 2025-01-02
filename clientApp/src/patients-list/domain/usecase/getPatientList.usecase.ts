import { Injectable } from "@angular/core";
import { UseCase } from "../../../base/domain/usecase/use-case";
import { PatientResponse } from "../../data/entities/patient-response.entity";
import { PatientsListRepository } from "../repositories/patients-list.repository";

@Injectable({
    providedIn: 'root',
})
export class GetPatientsListUseCase implements UseCase<{},PatientResponse[]>{

    constructor(private patiensListRepository: PatientsListRepository) { }

    execute(): Promise<PatientResponse[]> {
        return this.patiensListRepository.getPatientsList();
    }
    
}