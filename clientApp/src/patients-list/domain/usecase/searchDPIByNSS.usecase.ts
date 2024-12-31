import { Injectable } from "@angular/core";
import { UseCase } from "../../../base/domain/usecase/use-case";
import { DoctorRepository } from "../../../doctor/domain/repositories/doctor.repository";
import { PatientsListRepository } from "../repositories/patients-list.repository";
import { SearchPatientResponse } from "../../data/entities/search-response.entity";

@Injectable({
    providedIn: 'root',
})
export class SearchDPIUseCase implements UseCase<string | null,SearchPatientResponse>{

    constructor(private patiensListRepository: PatientsListRepository) { }

    execute(params: string | null): Promise<SearchPatientResponse> {
        return this.patiensListRepository.searchDPI(params);
    }
    
}