import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'bank-simulator',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './bank-simulator.component.html',
  styleUrl: './bank-simulator.component.css'
})
export class BankSimulatorComponent implements OnInit{

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
