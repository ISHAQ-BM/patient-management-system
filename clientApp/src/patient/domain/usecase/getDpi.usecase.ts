import { Injectable } from "@angular/core";
import { UseCase } from "../../../base/domain/usecase/use-case";
import { DPIResponse } from "../../data/entities/dpi-response.entity";
import { PatientRepository } from "../repositories/patient.repository";

@Injectable({
  providedIn: 'root',
})
export class GetDPIUseCase implements UseCase<{}, DPIResponse[]> {

  constructor(private patientRepository: PatientRepository) {}

  execute(): Promise<DPIResponse[]> {
    return this.patientRepository.getDPI();
  }

}
