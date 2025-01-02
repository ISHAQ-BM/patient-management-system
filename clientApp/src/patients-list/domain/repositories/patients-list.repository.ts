import { Injectable } from "@angular/core";
import { SearchPatientResponse } from "../../data/entities/search-response.entity";
import { PatientResponse } from "../../data/entities/patient-response.entity";

@Injectable({
    providedIn: 'root',
})
export abstract class PatientsListRepository {
    abstract searchDPI(params : string | null): Promise<SearchPatientResponse>;
    abstract getPatientsList(): Promise<PatientResponse[]>;


}