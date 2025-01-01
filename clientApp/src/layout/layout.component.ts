import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [MatIconModule,MatToolbarModule,RouterModule,CommonModule],
})
export class LayoutComponent {
  username = 'Mohamed Hidjab';
  role='doctor'
}
