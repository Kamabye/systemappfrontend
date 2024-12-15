
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    //path: 'home', component: IndexComponent, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    //path: 'admin', component: DashboardComponent, loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    //path: 'account', component: AccountComponent, loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
    path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  },

  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },


  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }