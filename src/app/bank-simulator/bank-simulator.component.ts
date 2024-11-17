import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BankDebtRow } from './bank-simulator.model';
import { BankSimulatorService } from './bank-simulator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bank-simulator',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './bank-simulator.component.html',
  styleUrl: './bank-simulator.component.css'
})
export class BankSimulatorComponent implements OnInit{

  customerName = '';

  bankName: string | null = null;
  

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    // Capture the bank name from the route parameter
    this.bankName = this.route.snapshot.paramMap.get('bankName');

    // Log or use this variable to differentiate functionality
    console.log('Bank Name:', this.bankName);

    this.bankDataService.updateTableData([]);
  }

  private bankDataService = inject(BankSimulatorService);


  // Functionality for checkboxes and the select all checkbox

  selectAll = false;

  tableData = computed<BankDebtRow[]>(() => this.bankDataService.allData());

  toggleSelectAll() {
    this.tableData().forEach(row => row.selected = this.selectAll);
  }

  updateSelectAllState() {
    const allSelected = this.tableData().every(row => row.selected);
    this.selectAll = allSelected;
  }


  onLookUp() {  

    if (this.customerName.trim()) {
      console.log('Looking up debts for customer:', this.customerName);

      // Call the service method and handle the response
      const subscription = this.bankDataService.lookUpDebtsByCustomerName(this.customerName)
      .subscribe({
        next: (data) =>{
          console.log('Debts fetched successfully:', data);
          // Update the table data with the response
          this.bankDataService.updateTableData(data);
        },
        error: (error) => {
          console.log('Error during debt lookup:', error);
        }
      });

      // Unsubscribe on destroy to prevent memory leaks
      this.bankDataService.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
    else {
      console.log('Customer name is required.');
    }
  }

  // selectAllControl = new FormControl(false);
  // rowControls: FormArray<FormControl<boolean>> = new FormArray<FormControl<boolean>>([]);
  // toggleSelectAll() {
  //   const isChecked = this.selectAllControl.value ?? false; // Handle null case
  //   this.rowControls.controls.forEach(control => control.setValue(isChecked, { emitEvent: false }));
  // }
  // updateSelectAllState() {

  //   const allSelected = this.rowControls.controls.every(control => control.value === true);
  //   const noneSelected = this.rowControls.controls.every(control => control.value === false);
  
  //   if (allSelected) {
  //     this.selectAllControl.setValue(true, { emitEvent: false }); // Check header checkbox
  //   } else if (noneSelected) {
  //     this.selectAllControl.setValue(false, { emitEvent: false }); // Uncheck header checkbox
  //   } else {
  //     this.selectAllControl.setValue(false, { emitEvent: false }); // Partially selected state
  //   }
  // }
  
  
  // -----------------------end select all checkboxes--------------


  

  // form = new FormGroup(
  //   {
  //     customerName: new FormControl('', {
  //       validators: [Validators.required]
  //     }),
  //     // selectAllControl: new FormControl(false),
  //     // rowControls: new FormArray<FormControl<boolean>>([])
  //   });

    // get customerNameIsInvalid () {
    //   return (
    //     this.form.controls.customerName.touched &&
    //     this.form.controls.customerName.dirty &&
    //     this.form.controls.customerName.invalid
    //   )
    // }

    // get customerNameErrors () {
    //   const errors = this.form.controls.customerName.errors;

    //   if (errors) {
    //     if (errors['required']) {
    //       return 'Customer\'s Name cannot be empty.'
    //     }
    //   }
    //   return null;
    // }

  

  
  
}
