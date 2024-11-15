import { Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
      customerID: new FormControl(''),
    });

  bankName: string | null = null;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    // Capture the bank name from the route parameter
    this.bankName = this.route.snapshot.paramMap.get('bankName');

    // Log or use this variable to differentiate functionality
    console.log('Bank Name:', this.bankName);
  }

  
  onSubmit() {

  }
}
