import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { response } from "express";
import { catchError, tap, throwError } from "rxjs";
import { ErrorService } from "./errorHandler/error.service";

@Injectable({providedIn: 'root'})
export class AuthService {

    private httpClient = inject(HttpClient);

    private errorService = inject(ErrorService);

    // not authenticated by default
    private isAuthenticated = false;

    // private baseURL = 'https://localhost:7096/api/user';
    private baseURL = 'https://coolectorapivs.azurewebsites.net/api/user';

    // Set Authentication status to true
    login(email: string, password: string) 
    {
        const loginData = 
        {
            email: email,
            password: password
        };

        return this.httpClient
        .post<any>( `${this.baseURL}/login`, loginData, 
        {
            headers: { 'Content-Type': 'application/json', 'Accept': '*/*' }
        })
        .pipe(
            tap((response) =>
            {
                const token = response.token;
                if (token)
                {
                    sessionStorage.setItem('authToken', token);
                    console.log('Token stored in sessionStorage.');
                }
            }
            ),
            catchError((error) => 
            {
                if (error.status === 401)
                {
                    this.errorService.showError('Unauthorized - Invalid email or password.');
                }
                else 
                {
                    this.errorService.showError('Please try again later.');
                }
                
                return throwError(() => new Error ('Auth service error thrown.'));
            })
        )
    }

    // Method to retrieve the token from sessionStorage
    getToken(): string | null {
        return sessionStorage.getItem('authToken');
    }
    

    // authenticated to false upon logout
    logout(): void {
        this.isAuthenticated = false;
    }

    // return current authentication status
    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }


    newUser(email: string, password: string, firstName: string, lastName: string, relation: string)
    {
        const signUpData = 
        {
            email: email, password: password, firstName: firstName, lastName: lastName, relation: relation
        };

        return this.httpClient
        .post<any>(`${this.baseURL}/new`, signUpData,
            {
                headers: { 'Content-Type': 'application/json', 'Accept': '*/*' }
            })
        .pipe(
            tap((response) =>
            {
                if (response.status === 200)
                    console.log('User created successfully.');
            }
            ),
            catchError((error) =>
            {
                return throwError(() => new Error ('Error at user creation.'));
            })
        )
    }
}