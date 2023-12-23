import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';

import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      // otras rutas del módulo account
    ]
  }
];


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
