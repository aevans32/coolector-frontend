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
  isAddingNewRow = false; // Track if we are adding a new row

  newRow: dataRow = { client: '', status: '', amount: '', bank: '', issueDate: '', expDate: '', payDate: '', moreActions: '', selected: false };
  
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

  /**
   * Method to handle the event of pressing the New button.
   * Creates a new debt instance by adding a new row to the table.
   */
  onPressingNewButton() {
    this.isAddingNewRow = true; // Enable adding mode
    this.newRow = { client: '', status: '', amount: '', bank: '', issueDate: '', expDate: '', payDate: '', moreActions: '', selected: false }; // Reset new row data
  }

  saveNewRow() {
    if (this.newRow.client && this.newRow.status && this.newRow.amount) { // Check mandatory fields
      this.tableDataService.addRow(this.newRow); // Add row through service
      this.isAddingNewRow = false; // Exit adding mode
    } else {
      console.log('Please fill in the required fields.');
    }
  }

  cancelNewRow() {
    this.isAddingNewRow = false; // Exit adding mode without saving
  }

  /**
   * Method to handle the event of pressing the Delete button.
   * Deletes the selected debts from the table.
   * TODO: this will need an Are You Sure pop up.
   */
  onPressingDeleteButton() {
    console.log("Delete Button pressed");
  }
  

}
