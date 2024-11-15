import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { BankSimulatorComponent } from "../bank-simulator/bank-simulator.component";

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    HeaderComponent, 
    SidebarComponent, 
    RouterOutlet],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

  
}
