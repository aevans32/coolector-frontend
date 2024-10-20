import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { routes } from '../app.routes';



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
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  private httpClient = inject(HttpClient);

  private destroyRef = inject(DestroyRef);

  private authService = inject(AuthService);

  errorSignal = signal(''); // Signal for throwing a Sign In error

  // TODO: see if the routes can be injected
  // private router = inject(routes);

  constructor (
    private router: Router
  ) {}

  /**
   * This is where the form's elemements (email and pw)
   * get converted into variables.
   * These variables are manipulated upon clicking the Login Button.
   * Before that there are some pre-login validations .
   */
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
    // ===========================================  end of pre login validations ===========================================
  
  
  

  /**
   * This is what happens when the site gets loaded
   */
  ngOnInit() {

    
      // TODO: replace this getAll method for faster tests to "wake up" the backend and database.
      // Make GET request to the .NET backend API
      const subscription1 = this.httpClient.get('https://localhost:7096/api/user/getAll')
        .subscribe({
          next: (resData) => {
            // Log the response to the console
            console.log(resData);
          },
          error: (err) => {
            // Handle any errors
            console.error('Error fetching user data:', err);
          }
        });
  
      // Unsubscribe when the component is destroyed
      this.destroyRef.onDestroy(() => {
        subscription1.unsubscribe();
      });


    const subscription = this.reactiveForm.valueChanges.
    pipe(debounceTime(500)).
    subscribe({
      next: value => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.reactiveEmail}))
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  // ===========================================  end of ngOnInit ===========================================
  

  get invalidSignIn() {
    return 'Invalid sign in.';
  }


  /**
   * This is what happens when you hit the sign in button
   * @returns 
   */
  onSubmit() {
    const enteredEmail = this.reactiveForm.controls.reactiveEmail.value;
    const enteredPassword = this.reactiveForm.controls.reactivePassword.value;

    // TODO: if the form is invalid we need to have a display for the user instead of just the terminal.
    if (this.reactiveForm.invalid || !enteredEmail || !enteredPassword) {
      console.log('INVALID FORM');
      this.invalidSignIn;
      return;
    }


    const subscription2 = this.authService.login(enteredEmail, enteredPassword).subscribe(
      {
        next: (resData) =>
        {
          // Log success response
          console.log('Login successful:', resData);
        },
        error: (err) => 
        {
          // Handle error response (the message comes from the service)
          console.error('Error at sign-in component:', err.message);
        }
      }
    );

    // Unsubscribe when the component is destroyed
    this.destroyRef.onDestroy(() => {
      subscription2.unsubscribe();
    });

  }
  // ===========================================  end of onSubmit ===========================================
}
