import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';

import { Logger } from '@angular/compiler-cli';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; // Importa el locale español
import { DatePipe } from '@angular/common'; // Importa DatePipe

registerLocaleData(localeEs, 'es'); // Registra el locale español con el ID 'es'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }, // Proporciona el locale ID
    DatePipe // Asegúrate de proporcionar DatePipe si lo usas en providers
  ],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }