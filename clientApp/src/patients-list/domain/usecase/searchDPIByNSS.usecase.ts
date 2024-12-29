import { Injectable } from "@angular/core";
import { UseCase } from "../../../base/domain/usecase/use-case";
import { DoctorRepository } from "../../../doctor/domain/repositories/doctor.repository";
import { PatientsListRepository } from "../repositories/patients-list.repository";

@Injectable({
    providedIn: 'root',
})
export class SearchDPIUseCase implements UseCase<string | null,{}>{

    constructor(private patiensListRepository: PatientsListRepository) { }

    execute(params: string | null): Promise<{}> {
        return this.patiensListRepository.searchDPI(params);
    }
    
}