import { Component } from '@angular/core';
import { AuthComponent } from '../auth/presentation/auth.component';
import { DashboardComponent } from '../dashboard/presentation/dashboard.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthRepository } from '../auth/domain/repositories/auth.repository';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent , AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
   constructor(private router: Router, private authRepository: AuthRepository) {}

  ngOnInit(): void {
    if (this.authRepository.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
