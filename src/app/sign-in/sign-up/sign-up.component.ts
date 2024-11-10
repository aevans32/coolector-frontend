import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';


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

// function equalValues(control: AbstractControl) {
//   const password = control.get('password')?.value;
// }



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);


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


  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    )
  }

  get firstPasswordIsInvalid() {
    const passwordControl = this.form.get('passwords.confirmPassword');
    return (
      passwordControl?.touched &&
      passwordControl?.dirty &&
      passwordControl?.invalid
    );
  }

  get notMatching() {
    return (
      this.form.controls.passwords.touched &&
      this.form.controls.passwords.dirty &&
      this.form.controls.passwords.invalid
    )
  }

  
  get notMatchingMessage() {
    const pwGroupControl = this.form.controls.passwords.errors;

    if (pwGroupControl) {
      if (pwGroupControl['valuesNotEqual']) {
        console.log("Passwords do not match.");
        return 'Passwords do not match.';
      }
    }

    return;
  }
  
  

  onSubmit() {

    const enteredEmail = this.form.controls.email.value;
    const enteredPw = this.form.get('passwords.password')?.value;
    const enteredFirstName = this.form.controls.firstName.value;
    const enteredLastName = this.form.controls.lastName.value;
    const enteredRelation = this.form.controls.relation.value;

    if (this.form.invalid || !enteredEmail || !enteredPw || !enteredFirstName || !enteredLastName || !enteredRelation) {
      console.log('INVALID FORM');
      return;
    }

    const subscription = this.authService.newUser(enteredEmail,enteredPw, enteredFirstName,enteredLastName, enteredRelation)
    .subscribe(
      {
        next: () =>
        {
          console.log('New user created.');
          this.router.navigate(['sign-in']);
        },
        error: (err) =>
        {
          console.error('Error at sign-up component:', err.message);
        }
      }
    );

    this.destroyRef.onDestroy(() => 
    {
      subscription.unsubscribe();
    });

    console.log('Form submitted and user added.');

    // TODO: ADD THE CALL TO DISPLAY THE SUCCESS MESSAGE HERE AFTER THE USER IS CREATED


  }

  

}
