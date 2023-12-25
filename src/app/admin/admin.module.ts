import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RolesComponent } from './roles/roles.component';
import { FormrolComponent } from './roles/formrol.component';

import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'admin', component: DashboardComponent,
    children: [
      { path: 'rol', component: RolesComponent },
      { path: 'rol/form', component: FormrolComponent },
      { path: 'rol/form/:idRol', component: FormrolComponent },
    ]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    RolesComponent,
    FormrolComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),FormsModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AdminModule { }
