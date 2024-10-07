import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {

    // not authenticated by default
    private isAuthenticated = false;

    // Set Authentication status to true
    login(): void {
        this.isAuthenticated = true;
    }

    // authenticated to false upon logout
    logout(): void {
        this.isAuthenticated = false;
    }

    // return current authentication status
    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
}