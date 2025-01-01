import { Injectable } from "@angular/core";
import { DPIResponse } from "../../data/entities/dpi-response.entity";

@Injectable({
  providedIn: 'root',
})
export abstract class PatientRepository {
    abstract getDPI(id: string): Promise<DPIResponse>;
}