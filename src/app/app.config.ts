import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';



/*
    This function uses request interceptors to log these Http requests
    The type of http requests is unknown to resemble different possible types
*/
function loggingInterceptor (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn)
  {
    // These log the request in the Console tab of ev tools
    console.log('Outgoing Request\n' + request);

    // returns the request, pipe logs the reponse from backend
    return next(request).pipe(
      tap({
        next: event => {
          if(event.type === HttpEventType.Response) {
            console.log('Incoming Response\n' + 
              event.status + '\n' +
              event.body
            );
          }
        }
      })
    )
  }


  // withInterceptors is necessary to intercept Http requests
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideCharts(withDefaultRegisterables()), 
    provideHttpClient(withInterceptors([loggingInterceptor]))
  ]
};
