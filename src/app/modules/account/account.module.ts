import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from 'src/app/auth.guard';
import { FormsModule } from '@angular/forms';

import { ObrasComponent } from './obras/obras.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: 'obras', component: ObrasComponent },
      //{ path: 'rol/form', component: FormrolComponent },
      //{ path: 'rol/form/:idRol', component: FormrolComponent },
    ]
  }
];


@NgModule({
  declarations: [
    AccountComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    ObrasComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),FormsModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AccountModule { }
