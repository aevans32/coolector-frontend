import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { User } from './user.model';
import { ErrorService } from '../shared/error.service';
import { HttpClient } from '@angular/common/http';
import { UserLoginDTO } from './user-login.dto';
import { catchError, map, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // injects the Error Service component to handle errors application wide
  private errorService = inject(ErrorService);
  // http client and signal elements from Angular libraries
  private httpClient = inject(HttpClient);

  private destroyRef = inject(DestroyRef);

  
  // TODO: maybe this signal also needs to go bye bye
  // signal for the current user
  // private currentUserSig = signal<User>({
  //   id: 0,            
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  //   password: '',
  //   relation: 'classmate'
  // });

  private rootUrl = "http://localhost:7096/api/user";

  // TODO: maybe this needs to be protected...
  // currentUser = this.currentUserSig.asReadonly();


  /*  
    this is called from the following messages, in the course these were used to display errors upon ngOnInit() rendering.
  */
  private generateErrorMessage(context: string)
  {
    return `Something went wrong fetching ${context} users. Please try again`;
  }


  /* 
    this is called from available-places component with ngOnInit(), so at the start
  */
    // loadAvailablePlaces() {
    //   return this.fetchPlaces(this.rootUrl + "places", 
    //     this.generateErrorMessage("the available"));
    // }
  
  
    // /* 
    //   this is called from user-places component with ngOnInit(), so at the start
    // */
    // loadUserPlaces() {
    //   return this.fetchPlaces(this.rootUrl + "user-places", 
    //     this.generateErrorMessage("your favorite")
    //   ).pipe(tap({
    //       // this updates the value in userPlacesSig or the places signal
    //       next: (userPlaces) => this.userPlacesSig.set(userPlaces)
    //     })
    //   );
    // }

    
    /**
     * PUT method for initial login.
     * 
     * <{ token: string }> is a TypeScript generic type. 
     * It specifies the expected shape of the response from the server. 
     * In this case, it's saying that the server will respond with an object that contains a property named token, 
     * and the value of token will be a string.
     * 
     * ${this.rootUrl}/login is the URL to which the POST request is sent.
     * 
     * loginPayload is the data being sent in the body of the POST request.
     * This is typically passed as the second argument in the .post method, 
     * where Angular automatically converts it into a JSON payload for you.
     */
    // login (email: string, password: string)
    // {
    //   // Credentials taken from the login page
    //   const loginPayload: UserLoginDTO = 
    //   {
    //     email,
    //     password
    //   };

      

    //   const subscription = this.httpClient
    //     .post<{ token: string }>(`${this.rootUrl}/login`, loginPayload)
    //     .pipe(
    //       tap((response) =>
    //       {
    //         // This performs a side effect (logging the token), but doesn't modify the response
    //         console.log('Login successful, token:', response.token);
    //         // Could store the token here but no change to the response
    //       }),
    //       map((response) => response.token), // Only extract the token in this case
    //       catchError((errorRes) => {  
    //         // Handle error: If login fails, show error message from the API response
    //         if (errorRes.status === 401 && errorRes.error && errorRes.error.message) {
    //           // If Unauthorized (401), use the message from the API response
    //           this.errorService.showError(errorRes.error.message);
    //         } else {
    //           // Handle any other error status code (like server issues)
    //           this.errorService.showError('Login failed. Any other error happened.' + errorRes.message);
    //         }
    //         // Throw the error after displaying the message
    //         return throwError(() => new Error('Login failed.'));
    //       })
    //     ).subscribe({
    //       next: (token) => {
    //         console.log('Token received:', token);
    //         // Any additional logic once the token is received, like storing it
    //       },
    //       error: (error) => {
    //         console.log('Login error', error.message);
    //       }
    //     });

    //     // Unsubscribe from the login subscription to prevent memory leaks
    //     this.destroyRef.onDestroy(() =>
    //     {
    //       subscription.unsubscribe();
    //     });
    //   }


      login(email: string, password: string) {
        // Credentials taken from the login page
        const loginPayload: UserLoginDTO = {
          email,
          password
        };
      
        

        return this.httpClient
        .post(`${this.rootUrl}/login`, loginPayload)
        .pipe(
          catchError(error => 
          {
            this.errorService.showError('Failed at user.services.ts');
            return throwError(() => new Error('This is the thrown errror at user.service.'));
          }
          )
        )



        // // Send the POST request with the login payload
        // return this.httpClient
        //   .post<{ token: string }>(`${this.rootUrl}/login`, loginPayload)
        //   .pipe(
        //     // Log the success and handle token response
        //     tap(response => {
        //       console.log('Login successful, token:', response.token);
        //       // Store the token or perform any side effects as needed
        //     }),
        //     // Handle errors from the request
        //     catchError(errorRes => {
        //       // If Unauthorized (401), use the message from the API response
        //       if (errorRes.status === 401 && errorRes.error && errorRes.error.message) {
        //         this.errorService.showError(errorRes.error.message);
        //       } else {
        //         // Handle any other error status code
        //         this.errorService.showError('Login failed at frontend: ' + errorRes.message);
        //       }
        //       // Return the error so it can be caught by the caller
        //       return throwError(() => new Error('Login failed.'));
        //     })
        //   );




      }
      



      // return this.httpClient
      // .post<{ token: string }>(`${this.rootUrl}/login`, loginPayload)
      // .pipe(
      //   tap((response) =>
      //   {
      //     // This performs a side effect (logging the token), but doesn't modify the response
      //     console.log('Login successful, token:', response.token);
      //     // Could store the token here but no change to the response
      //   }),
      //   map((response) => response.token), // Only extract the token in this case
      //   catchError((errorRes) => {
      //     // Handle error: If login fails, show error message from the API response
      //     if (errorRes.status === 401 && errorRes.error && errorRes.error.message) {
      //       // If Unauthorized (401), use the message from the API response
      //       this.errorService.showError(errorRes.error.message);
      //     } else {
      //       // Handle any other error status code (like server issues)
      //       this.errorService.showError('Login failed. Any other error happened.' + errorRes.message);
      //     }
      //     // Throw the error after displaying the message
      //     return throwError(() => new Error('Login failed.'));
      //   })
      // );
    
    // ----------end of login PUT method----------





  // // first, an empty array of users
  // private users: User[] = [];

  // // then, the current ID
  // private currentId = 1;

  // // an empty constructor...
  // constructor() { }

  // // Method to GET all the users
  // getUsers(): User[] {
  //   return this.users;
  // }






  // // Method to add a new user
  // addUser(email: string, password: string, firstName: string, lastName: string, relation: string): void {

  //   // characteristics of the new User
  //   const newUser: User = {
  //     id: this.currentId,
  //     email, password, firstName, lastName,
  //     relation: relation as 'classmate' | 'professor' | 'coworker' | 'friend' | 'other'
  //   };

  //   // adding the new user to the list of users
  //   this.users.push(newUser);

  //   // updating the current ID
  //   this.currentId++;

  //   // logging the operation
  //   console.log('User added:', newUser);
  // }
}
