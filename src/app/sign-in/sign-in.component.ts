import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {


  // ffsdfasdfasfss

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(event: Event): void {

    event.preventDefault();

    // Here you could validate form fields and authenticate with a backend
    this.authService.login(); // log the user in
    this.router.navigate(['dashboard']); //navigate to the dashboard
  }

}
