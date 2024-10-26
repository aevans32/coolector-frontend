import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-in/sign-up/sign-up.component';
import { MainViewComponent } from './main-view/main-view.component';
import { BankSimulatorComponent } from './bank-simulator/bank-simulator.component';

// using this method to see it user is authenticated
const canActivateMainView = () => inject(AuthService).getToken();

export const routes: Routes = [
    // { path: '', redirectTo: 'sign-in', pathMatch: 'full' }, // Redirect to the sign-in page by default
    { path: '', redirectTo: 'app-bank-simulator', pathMatch: 'full' }, // Redirect to the sign-in page by default
    { 
        path: 'sign-in',                        // Route to the sign-in component
        component: SignInComponent 
    },
    {
        path: 'main-view',                        
        component: MainViewComponent,
        canActivate: [canActivateMainView] //protect the route
    }, 
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'app-bank-simulator',
        component: BankSimulatorComponent
    }
  ];
