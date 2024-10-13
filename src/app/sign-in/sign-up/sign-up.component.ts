import { Component } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


/*
  Validation function factory to check if 2 values are the same
  we turned it into a factory so it woud take parameters
*/ 
function equalValues(controlName1: string, controlName2: string) {
  // this way the AbstractControl passes parameters into a nested function
  return (control: AbstractControl) => {

    // all of these controls come with getter methods, we add a ? in case it never was created
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    // ternary operator with a nested function
    return val1 === val2 ? null : (() => {
      { valuesNotEqual: true }
    });
  }
}




@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  form = new FormGroup({
    
  });

  onSubmit() {

  }

}
