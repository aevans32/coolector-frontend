import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart2',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart2.component.html',
  styleUrl: './chart2.component.css'
})
export class Chart2Component {

  public pieChartLabels: string[] = [
    'Label1',
    'Label2',
    'Label3'
  ];

  public pieChartDatasets: ChartDataset<'pie'>[] = [
    {
      data: [30, 50, 20],
      backgroundColor: ['#007bff', '#dc3545', '#28a745'],
      hoverBackgroundColor: ['#0056b3', '#c82333', '#218838'],
    }
  ];
  
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

}
