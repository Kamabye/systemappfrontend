import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { RolComponent } from './usuario/rol.component';

import { UsuarioService } from './usuario/usuario.service';
import { RolService } from './usuario/rol.service';

import { FormsModule } from '@angular/forms';
import { FormrolComponent } from './usuario/formrol.component';


const routes : Routes = [
  { path: '',redirectTo: '/', pathMatch: 'full'},
  { path: 'usuarios', component: UsuarioComponent},
  { path: 'roles', component: RolComponent},
  { path: 'roles/form', component: FormrolComponent},
  { path: 'roles/form/:idRol', component: FormrolComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsuarioComponent,
    RolComponent,
    FormrolComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UsuarioService, RolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
