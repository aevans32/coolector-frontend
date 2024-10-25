import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bank-simulator',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bank-simulator.component.html',
  styleUrl: './bank-simulator.component.css'
})
export class BankSimulatorComponent {

  form = new FormGroup({

  });

  onSubmit() {
    
  }
}
