import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Paciente } from 'src/app/models/paciente';
import { Consulta } from 'src/app/models/consulta';
import { PacienteService } from 'src/app/services/paciente.service';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-datosconsulta',
  templateUrl: './datosconsulta.component.html'
})
export class DatosconsultaComponent implements OnInit{

  ngOnInit(): void {
    this.cargarpaciente();
}
  cargarpaciente() {
    throw new Error('Method not implemented.');
  }

}
