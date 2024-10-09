import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';


// custom control for parameter validation
function mustContainQuestionMark(control: AbstractControl) {
  // includes is a JS method to check just that
  if (control.value.includes('?')) {
    // returning null tells Angular that this control is valid
    return null;
  }
  // alternatively, returns an object with a property set to true
  return { doesNotContainQuestionMark: true };
}


// ⚠️TODO: change this for a method that cheques the database
// customer async control to see if a hardcoded email already exists
function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    // dont return just null, instead return an Observable that returns null
    return of(null);
  }
  // if the email has already been used and we need to return an error
  // this observable will return a different type of object
  return of({ notUnique: true })
}



let initialEmailValue = '';

const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}



@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  private destroyRef = inject(DestroyRef);

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  reactiveForm = new FormGroup({
    reactiveEmail: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique]
    }),
    reactivePassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  get emailIsInvalid() {
    return (
      this.reactiveForm.controls.reactiveEmail.touched &&
      this.reactiveForm.controls.reactiveEmail.dirty &&
      this.reactiveForm.controls.reactiveEmail.invalid
    )
  }

  get passwordIsInvalid() {
    return (
      this.reactiveForm.controls.reactivePassword.touched &&
      this.reactiveForm.controls.reactivePassword.dirty &&
      this.reactiveForm.controls.reactivePassword.invalid
    )
  }

  get emailErrors () {
    const errors = this.reactiveForm.controls.reactiveEmail.errors;

    if (errors) {
      if (errors['notUnique']) {
        return 'Email cannot be test@example.com';
      } else if (errors['email']) {
        return 'Invalid email format, please try again.';
      } else if (errors['required']) {
        return 'Email cannot be null.';
      }
    }
    return null;
  }

  /*
    getter to get an appropriate error message for the password
  */
    get passwordErrors() {
      // the potential available errors 
      const controlErrors = this.reactiveForm.controls.reactivePassword.errors;
  
      // if its truthy or if it exists
      if(controlErrors) {
        // the minlength will be prioritized with this search to appear first
        if(controlErrors['minlength']) {
          return 'Password must be at leas 6 characters long.';
        } else if (controlErrors['doesNotContainQuestionMark']) {
          return 'Password must contain a "?" character.';
        }
      }
      return null;
    }

    get signInErrors() {

      const errorEmail = this.reactiveForm.controls.reactiveEmail.errors;
      const errorPw = this.reactiveForm.controls.reactivePassword.errors;

      if (errorEmail || errorPw) {
        return 'Please fill email an password fields appropriately.';  
      }

      return null;
    }
  
  
  

  // auto populate email with previous values
  ngOnInit() {
    const subscription = this.reactiveForm.valueChanges.
    pipe(debounceTime(500)).
    subscribe({
      next: value => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.reactiveEmail}))
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  

  // if the form is invalid then the mapping for dashboard wont activate
  onSubmit() {
    const enteredEmail = this.reactiveForm.controls.reactiveEmail;
    const enteredPassword = this.reactiveForm.controls.reactivePassword;

    if (this.reactiveForm.invalid) {
      console.log('INVALID FORM');
      return;
    }

    // Here you could validate form fields and authenticate with a backend
    this.authService.login(); // log the user in
    this.router.navigate(['dashboard']); //navigate to the dashboard
  }

  newSignUp(event: Event): void {
    event.preventDefault();

    this.router.navigate(['sign-up']);
  }

}
