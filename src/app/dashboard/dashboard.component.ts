import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { DataTableComponent } from "./data-table/data-table.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent, DataTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
