import { Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BankDebtRow } from './bank-simulator.model';
import { BankSimulatorService } from './bank-simulator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bank-simulator',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './bank-simulator.component.html',
  styleUrl: './bank-simulator.component.css'
})
export class BankSimulatorComponent implements OnInit{

  private bankDataService = inject(BankSimulatorService);

  tableData = computed<BankDebtRow[]>(() => this.bankDataService.allData());

  form = new FormGroup(
    {
      customerName: new FormControl('', {
        validators: [Validators.required]
      })
    });

    get customerNameIsInvalid () {
      return (
        this.form.controls.customerName.touched &&
        this.form.controls.customerName.dirty &&
        this.form.controls.customerName.invalid
      )
    }

    get customerNameErrors () {
      const errors = this.form.controls.customerName.errors;

      if (errors) {
        if (errors['required']) {
          return 'Customer\'s Name cannot be empty.'
        }
      }
      return null;
    }

  bankName: string | null = null;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    // Capture the bank name from the route parameter
    this.bankName = this.route.snapshot.paramMap.get('bankName');

    // Log or use this variable to differentiate functionality
    console.log('Bank Name:', this.bankName);
  }

  
  onSubmit() {

    const customerNameControl = this.form.get('customerName');

    // Get the Customer Name from the form
    const customerName = this.form.get('customerName')?.value;

    if (customerName) {
      console.log('Looking up debts for customer:', customerName);

      // Call the service method and handle the response
      const subscription = this.bankDataService.lookUpDebtsByCustomerName(customerName)
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
      
      customerNameControl?.markAsTouched();
      customerNameControl?.setErrors({ required: true });

      console.log('Customer name is required.');
    }
  }
}
