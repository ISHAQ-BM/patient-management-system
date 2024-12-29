import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export abstract class PatientsListRepository {
    abstract searchDPI(params : string | null): Promise<{}>;

}