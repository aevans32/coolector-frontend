import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { ErrorService } from './errorHandler/error.service';
import { ErrorModalComponent } from './errorHandler/modal/error-modal/error-modal.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, DashboardComponent, CommonModule, ErrorModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'coolector-frontend';

  // we listen to the error signal from error.service.ts in case it gets triggered
  // we place it here to have an app wide error response

  // first we inject the ErrorService component
  private errorService = inject(ErrorService);

  // then we add a signal which exposes the error signal provided by the ErrorService 
  // this error will be rendered at app.component.html to block all other UI elements
  error = this.errorService.error;

  constructor (public authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }
}
