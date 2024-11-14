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

  newRow: dataRow = { client: '', status: false, amount: '', bank: '', issueDate: '', expDate: '', payDate: '', moreActions: '', selected: false };
  
  // this signal is taken from the html tempate to update it.
  // check the ngFor loop at around line 53
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
    this.newRow = { client: '', status: false, amount: '', bank: '-', issueDate: '', expDate: '', payDate: '-', moreActions: '', selected: false }; // Reset new row data
  }

  saveNewRow() {
    if (this.newRow.client  && this.newRow.amount && this.newRow.issueDate && this.newRow.expDate) { // Check mandatory fields
      console.log(this.newRow);
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
    const selectedCodes = this.tableData()
      .filter(row => row.selected && row.code != null)
      .map(row => row.code as number);
  
    // Subscribe to the delete request
    const subscription = this.tableDataService.deleteRows(selectedCodes).subscribe({
      next: () => {
        // Filter out the deleted rows from local table data
        const updatedData = this.tableData().filter(row => !selectedCodes.includes(row.code as number));
        this.tableDataService.updateTableData(updatedData);
        this.selectAll = false; // Reset the select-all checkbox
      },
      error: (error) => {
        console.error('Failed to delete selected rows:', error);
      }
    });
  
    // Unsubscribe on destroy to prevent memory leaks
    this.tableDataService.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  
  
  
  

}
