import { Routes } from '@angular/router';

import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
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
  
    //{ path: '**', redirectTo: '/', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
  ];