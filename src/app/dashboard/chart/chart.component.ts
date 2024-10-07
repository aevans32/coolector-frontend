import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {

  // im setting type over in the template
  // public lineChartType: ChartType = 'line';

  // X axis labels
  public lineChartLabels: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  // data and some parameters
  public lineChartDatasets: ChartDataset<'line'>[] = [
    {
      data: [
        15339,
        21345,
        18483,
        24003,
        23489,
        24092,
        12034
      ],
      label: 'Value',
      tension: 0,
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      borderWidth: 4,
      pointBackgroundColor: '#007bff' 
    }
  ];

  // options i guess...
  public lineChartOptions: ChartOptions<'line'> = {
    // responsive has to do with how big teh chart can get
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        padding: 3
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: false
      }
    }
  };

}
