import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthRepository } from '../auth/domain/repositories/auth.repository';
import { AuthImplementationRepository } from '../auth/data/repositories/auth-implementation.repository';
import { LoginUseCase } from '../auth/domain/usecase/login.usecase';
import { AdministratifRepository } from '../administratif/domain/repositories/administratif.repository';
import { AdministratifImplementationRepository } from '../administratif/data/repositories/administratif-implementation.repository';
import { CreateDPIUseCase } from '../administratif/domain/usecase/create-dpi.usecase';
import { PatientRepository } from '../patient/domain/repositories/patient.repository';
import { PatientImplementationRepository } from '../patient/data/repositories/patient-implementation.repository';
import { GetDPIUseCase } from '../patient/domain/usecase/getDpi.usecase';
import { SearchDPIUseCase } from '../patients-list/domain/usecase/searchDPIByNSS.usecase';
import { PatientsListRepository } from '../patients-list/domain/repositories/patients-list.repository';
import { PatientsListImplementationRepository } from '../patients-list/data/repositories/patients-list-implementation.repository';
import { LogoutUseCase } from '../auth/domain/usecase/lougout.usecase';
import { GetPatientsListUseCase } from '../patients-list/domain/usecase/getPatientList.usecase';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideAnimationsAsync(),
    { provide: AuthRepository, useClass: AuthImplementationRepository }, 
    { provide: LoginUseCase, useClass: LoginUseCase }, 
    { provide: LogoutUseCase, useClass: LogoutUseCase }, 
     { provide: AdministratifRepository, useClass: AdministratifImplementationRepository }, 
    { provide: CreateDPIUseCase, useClass: CreateDPIUseCase }, 
    { provide: PatientRepository, useClass: PatientImplementationRepository }, 
    { provide: GetDPIUseCase, useClass: GetDPIUseCase }, 
    { provide: PatientsListRepository, useClass: PatientsListImplementationRepository }, 
    { provide: SearchDPIUseCase, useClass: SearchDPIUseCase },
    { provide: GetPatientsListUseCase, useClass: GetPatientsListUseCase },
    provideHttpClient(withFetch()), provideAnimationsAsync(), provideAnimationsAsync(),
  
  ]
};