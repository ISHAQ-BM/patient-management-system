import { Injectable } from "@angular/core";
import { UseCase } from "../../../base/domain/usecase/use-case";
import { AuthRepository } from "../repositories/auth.repository";



@Injectable({
    providedIn: 'root',
})
export class LogoutUseCase implements UseCase<{},{}>{

    constructor(private authRepository: AuthRepository) { }

    execute(): Promise<{}> {
        return this.authRepository.logout();
    }
    
}