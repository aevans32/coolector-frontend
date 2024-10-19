import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-in/sign-up/sign-up.component';

// using this method to see it user is authenticated
const canActivateDashboard = () => inject(AuthService).isLoggedIn();

export const routes: Routes = [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' }, // Redirect to the sign-in page by default
    { 
        path: 'sign-in',                        // Route to the sign-in component
        component: SignInComponent 
    }, 
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [canActivateDashboard] //protect the route
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    }
  ];
