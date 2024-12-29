import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndexHomeComponent } from './index/indexhome.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FormpacienteComponent } from './paciente/formpaciente.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { DatosconsultaComponent } from './consulta/datosconsulta.component';
import { FormconsultaComponent } from './consulta/formconsulta.component';

import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {
    path: '',
    component: IndexHomeComponent,
    children: [
      
      { path: '', redirectTo: 'paciente', pathMatch: 'full' },

      { path: 'paciente', component: PacienteComponent },
      { path: 'paciente/form', component: FormpacienteComponent },
      { path: 'paciente/form/:idPaciente', component: FormpacienteComponent },

      //Crear una consulta ligada a un paciente.
      { path: 'consulta/form/:idPaciente', component: FormconsultaComponent },
      // Ver las consultas de un paciente
      { path: 'consulta/find/:idPaciente', component: ConsultaComponent },
      //Ver una consulta
      { path: 'consulta/view/:idConsulta', component: DatosconsultaComponent },
      //Editar la consulta
      { path: 'consulta/edit/:idConsulta', component: FormconsultaComponent },


      { path: 'ticket', component: TicketComponent },
    ]
  },
  //{path: '', redirectTo: 'home1', pathMatch: 'full'},
  { path: ' **', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    IndexHomeComponent,
    PacienteComponent,
    FormpacienteComponent,
    ConsultaComponent,
    DatosconsultaComponent,
    FormconsultaComponent,
    TicketComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule
  ],
  //exports: [RouterModule]
})
export class HomeModule { }
