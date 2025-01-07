import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { RolesComponent } from './roles/roles.component';
import { FormrolComponent } from './roles/formrol.component';

import { UsersComponent } from './users/users.component';
import { FormusuarioComponent } from './users/formusuario.component';

import { ObrasComponent } from './obras/obras.component';
import { ObraformComponent } from './obras/obraform.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [

      //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      //{ path: 'dashboard', component: DashboardComponent },
      { path: 'rol', component: RolesComponent },
      { path: 'rol/form', component: FormrolComponent },
      { path: 'rol/form/:idRol', component: FormrolComponent },
      { path: 'user', component: UsersComponent },
      { path: 'user/form', component: FormusuarioComponent },
      { path: 'user/form/:idUser', component: FormusuarioComponent },
      { path: 'obra', component: ObrasComponent },
      { path: 'obra/form', component: ObraformComponent },
      { path: 'obra/form/:idObra', component: ObraformComponent },
      


      //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      //{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },

  { path: '**', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    RolesComponent,
    FormrolComponent,
    UsersComponent,
    FormusuarioComponent,
    ObrasComponent,
    ObraformComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule
  ],
  //exports: [RouterModule],
})
export class AdminModule { }