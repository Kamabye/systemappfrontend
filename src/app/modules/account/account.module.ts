import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from 'src/app/auth.guard';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';


import { ObrasComponent } from './obras/obras.component';
import { ObraformComponent } from './obras/obraform.component';


const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: 'obra', component: ObrasComponent },
      { path: 'obra/form', component: ObraformComponent },
      { path: 'obra/form/:idObra', component: ObraformComponent },
    ]
  }
];


@NgModule({
  declarations: [
    AccountComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    ObrasComponent,
    ObraformComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),FormsModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AccountModule { }
