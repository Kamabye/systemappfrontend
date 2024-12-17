import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndexComponent } from './index/index.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FormpacienteComponent } from './paciente/formpaciente.component';
import { FormconsultaComponent } from './consulta/formconsulta.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { TicketComponent } from './ticket/ticket.component';
import { Paciente } from 'src/app/models/paciente';
import { Consulta } from 'src/app/models/consulta';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {path: '', redirectTo: 'paciente', pathMatch: 'full'},
      { path: 'paciente', component: PacienteComponent },
      { path: 'paciente/form', component: FormpacienteComponent },
      { path: 'paciente/form/:idPaciente', component: FormpacienteComponent },
      { path: 'consulta/form/:idPaciente', component: FormconsultaComponent },
      { path: 'consulta/view/:idPaciente', component: ConsultaComponent },
      { path: 'consulta/edit/:idConsulta', component: FormconsultaComponent },
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
    FormconsultaComponent,
    TicketComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule
  ],
  exports: [RouterModule]
})
export class HomeModule { }
