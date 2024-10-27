import { Component, inject } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // private router = inject(RouterLink);

  bankOfAmericaAccess() {

  }

}
