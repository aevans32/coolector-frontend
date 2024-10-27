import { Component, computed, inject, Input, input } from '@angular/core';
import { DataTableService } from './data-table.service';
import { dataRow } from './data-table.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  
  private tableDataService = inject(DataTableService);

  @Input() dataId!: string;

  // Variable to track the state of the "select all" checkbox
  selectAll = false;
  
  tableData = computed<dataRow[]>(() => this.tableDataService.allData());
  
  // Method to toggle all checkboxes when the "select all" checkbox is clicked
  toggleSelectAll() {
    this.tableData().forEach(row => row.selected = this.selectAll);
  }

  // Method to update the "select all" checkbox state when a row is changed
  updateSelectAllState() {
    const allSelected = this.tableData().every(row => row.selected);
    this.selectAll = allSelected;
  }
  

}
