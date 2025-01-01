import { Injectable } from "@angular/core";
import { SearchPatientResponse } from "../../data/entities/search-response.entity";

@Injectable({
    providedIn: 'root',
})
export abstract class PatientsListRepository {
    abstract searchDPI(params : string | null): Promise<SearchPatientResponse>;

}