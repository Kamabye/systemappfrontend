import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndexComponent } from './index/index.component';
import { FormpacienteComponent } from './paciente/formpaciente.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {path: '', redirectTo: 'paciente', pathMatch: 'full'},
      { path: 'paciente', component: PacienteComponent },
      { path: 'paciente/form', component: FormpacienteComponent },
      { path: 'paciente/form/:idPaciente', component: FormpacienteComponent },
      { path: 'consulta', component: ConsultaComponent },
      { path: 'ticket', component: TicketComponent },
    ]
  },
  //{path: '', redirectTo: 'home1', pathMatch: 'full'},
  { path: ' **', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    IndexComponent,
    PacienteComponent,
    FormpacienteComponent,
    ConsultaComponent,
    TicketComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule
  ],
  exports: [RouterModule]
})
export class HomeModule { }
