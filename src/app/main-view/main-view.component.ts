import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, DashboardComponent, RouterLink],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

  // private router = inject(RouterLink);
}
