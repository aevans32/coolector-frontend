import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bank-simulator',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './bank-simulator.component.html',
  styleUrl: './bank-simulator.component.css'
})
export class BankSimulatorComponent {

  form = new FormGroup({

  });

  

  onSubmit() {

  }
}
