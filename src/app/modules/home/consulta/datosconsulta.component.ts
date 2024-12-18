import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Paciente } from 'src/app/models/paciente';
import { Consulta } from 'src/app/models/consulta';
import { PacienteService } from 'src/app/services/paciente.service';
import { ConsultaService } from 'src/app/services/consulta.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-datosconsulta',
  templateUrl: './datosconsulta.component.html'
})
export class DatosconsultaComponent implements OnInit {

  
  public consulta: Consulta = new Consulta();
  //public paciente: Paciente = new Paciente();

  constructor(private pacienteService: PacienteService, private consultaService: ConsultaService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.info("DatosconsultaComponent ngOnInit()")
    this.cargarconsulta()
  }
  cargarconsulta(): void {
    console.info("DatosconsultaComponent cargarconsulta()")
    this.activateRoute.params.subscribe(params => {

      let idConsulta = params['idConsulta']

      if (idConsulta) {
        this.consultaService.getConsulta(idConsulta).subscribe({
          next: data => {
            if (data.body !== null) {
              this.consulta = data.body;
              console.info(this.consulta);
            } else {
              console.error('El cuerpo de la respuesta es nulo.');
            }

          },
          error: err => {
            swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
            console.error("Error al obtener el paciente: ", err);
          },
          complete: () => {
            console.log('DatosConsulta loaded');
          }
        });
      }
    });


  }

}
