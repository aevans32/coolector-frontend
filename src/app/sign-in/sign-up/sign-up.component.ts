import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';


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

  constructor(private userService: UserService) {}

  form = new FormGroup({
    // INITIALIZATION OF EMAIL
    email: new FormControl('', {
      // EMAIL VALIDATORS
      validators: [Validators.email, Validators.required]
    }),
    // INITIALIZATION OF THE PASSWORDS GROUP
    passwords: new FormGroup({
      // THE FIRST PASSWORD
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      // THE SECOND PASSWORD TO CONFIRM
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    }, {
      // VALIDATORS FOR THE PASSWORDS GROUP, SO THEY MATCH
      validators: [equalValues('password', 'confirmPassword')]
    }),
    // INITIALIZTION OF FIRST AND LAST NAME ALONG WITH VALIDATORS
    firstName: new FormControl('', {validators: [Validators.required]}),
    lastName: new FormControl('', {validators: [Validators.required]}),
    // NEXT IS THE DROPDOWN FOR HOW ARE YOU RELATED TO THE FOUNDERS
    relation: new FormControl
    // only a set number of posibilities
      <'classmate' | 'professor' | 'coworker' | 'friend' | 'other'>
      // it has to start with a value, so we select the first of the list, its akin to the empty strings above
      ('classmate', {
        // validators for the dropdown
        validators: [Validators.required]
      }),
    // THE I AGREE BUTTON
    // accepting terms and conditions its necessary so it has to change to true, it starts with false    
    agree: new FormControl(false, {validators: [Validators.required]})
  });



  onSubmit() {

    if (this.form.invalid) {
      console.log('INVALID FORM');
      return;
    }

    const { email, passwords, firstName, lastName, relation } = this.form.value;

    this.userService.addUser(
      email ?? '',
      passwords?.password ?? '',
      firstName ?? '',
      lastName ?? '',
      relation ?? ''
    );

    console.log('Form submitted and user added.');

    
  }

}
