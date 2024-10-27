import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { DataTableComponent } from "./data-table/data-table.component";
import { Chart2Component } from './chart2/chart2.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent, Chart2Component, DataTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
