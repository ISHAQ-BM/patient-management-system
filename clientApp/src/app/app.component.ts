import { Component, inject } from '@angular/core';
import { AuthRepository } from '../auth/domain/repositories/auth.repository';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css'],
  imports:[RouterModule,CommonModule,LayoutComponent]
})
export class AppComponent {
  
    authRepository = inject(AuthRepository);  
     
}
