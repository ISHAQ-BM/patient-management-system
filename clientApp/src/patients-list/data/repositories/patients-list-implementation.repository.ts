import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PatientsListRepository } from "../../domain/repositories/patients-list.repository";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PatientsListImplementationRepository extends PatientsListRepository {


     constructor(private http: HttpClient) {
        super();
    }

    override async searchDPI(params: string | null): Promise<{}> {
         const response = await firstValueFrom(
                     this.http.post<{}>('', params)    
                 );
                 
                 return response;
     }
    
   


    

    
    
}