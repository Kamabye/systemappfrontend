import { Routes } from '@angular/router';

import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './Utils/AuthGuard';

export const routes: Routes = [

  //Se esta redireccionando al módulo Home cuando no hay una subruta definida
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    {
      //path: 'admin', component: DashboardComponent, loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
      path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard], data: { authorities: ['ROLE_Administrador'] }
    },
    {
      //path: 'home', component: IndexComponent, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      path: 'user', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [authGuard], data: { authorities: ['ROLE_Administrador', 'ROLE_Editor'] }
    },
    {
      //path: 'home', component: IndexComponent, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [authGuard], data: { authorities: [] }
    },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
  
    //{ path: '**', redirectTo: '/', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
  ];