import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { LOCALE_ID } from '@angular/core';

import { HTTP_INTERCEPTORS  } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; // Importa el locale español
import { DatePipe } from '@angular/common'; // Importa DatePipe

registerLocaleData(localeEs, 'es'); // Registra el locale español con el ID 'es'

import { AuthInterceptor } from './app/Utils/authInterceptor';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Importa withInterceptorsFromDi

import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'es' }, // Proporciona el locale ID
    DatePipe, // Asegúrate de proporcionar DatePipe si lo usas en providers
    provideHttpClient(withInterceptorsFromDi()), // Configura HttpClient con interceptores de DI
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Registra el interceptor
  ]
}).catch(err => console.error(err));