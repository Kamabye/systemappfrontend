
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';

import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  
  //{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'admin', component: DashboardComponent, loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  //{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]},
  { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)},
  //{ path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard]},
  
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}