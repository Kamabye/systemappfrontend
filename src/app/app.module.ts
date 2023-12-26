

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';

import { UsuarioService } from './services/usuario.service';
import { RolService } from './services/rol.service';
import { AuthService } from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AccountModule } from './modules/account/account.module';
import { AdminModule } from './modules/admin/admin.module';

import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
    AppRoutingModule,
    AccountModule,
    AdminModule
  ],
  providers: [
    AdminModule,
    UsuarioService,
    RolService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }