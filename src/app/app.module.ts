import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { RolComponent } from './components/rol/rol.component';

import { UsuarioService } from './services/usuario.service';
import { RolService } from './services/rol.service';

import { FormsModule } from '@angular/forms';
import { FormrolComponent } from './components/rol/formrol.component';


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
    BodyComponent,
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
