import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UsuarioService } from './services/usuario.service';
import { RolService } from './services/rol.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { RolComponent } from './components/rol/rol.component';

import { FormsModule } from '@angular/forms';
import { FormrolComponent } from './components/rol/formrol.component';
import { FormusuarioComponent } from './components/usuario/formusuario.component';

import { LoggingInterceptor } from './services/interceptor';



const routes : Routes = [
  { path: '',redirectTo: '/', pathMatch: 'full'}, // Ruta por defecto
  //{ path: '', component: UsuarioComponent}, // Ruta por defecto que muestra un componente en el Index.html
  { path: 'usuarios', component: UsuarioComponent},
  { path: 'usuario/form', component: FormusuarioComponent},
  { path: 'usuario/form/:idUsuario', component: FormusuarioComponent},
  { path: 'roles', component: RolComponent},
  { path: 'rol/form', component: FormrolComponent},
  { path: 'rol/form/:idRol', component: FormrolComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    UsuarioComponent,
    FormusuarioComponent,
    RolComponent,
    FormrolComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [UsuarioService, RolService, { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }