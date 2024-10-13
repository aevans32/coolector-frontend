import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
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
bootstrapApplication(AppComponent, {
  ...appConfig, // Spread the configuration from appConfig
  providers: [provideHttpClient(
    withInterceptors([loggingInterceptor])
  )]
}).catch((err) => console.error(err));

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
