import { Component, computed, inject, Input, input } from '@angular/core';
import { DataTableService } from './data-table.service';
import { dataRow } from './data-table.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  

  private tableDataService = inject(DataTableService);

  // dataId = input.required<string>();
  @Input() dataId!: string;

  tableData = computed<dataRow[]>(() => this.tableDataService.allData());
  
  

}
