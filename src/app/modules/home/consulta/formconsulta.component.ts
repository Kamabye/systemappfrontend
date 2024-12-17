import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-formconsulta',
    templateUrl: './formconsulta.component.html'
  })

  export class FormconsultaComponent implements OnInit {

    public paciente: Paciente = new Paciente();
    public consulta: Consulta = new Consulta();

  constructor(private pacienteService: PacienteService, private consultaService: ConsultaService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.info("FormconsultaComponent ngOnInit()")

    this.cargarpaciente()
    //this.cargarconsulta()

  }

  cargarpaciente(): void {
      console.info("FormpconsultaComponent cargarpaciente()")
      this.activateRoute.params.subscribe(params => {
  
        let idPaciente = params['idPaciente']
  
        if (idPaciente) {
          this.pacienteService.getPaciente(idPaciente).subscribe({
            next: data => {
              if (data.body !== null) {
                this.paciente = data.body;
                console.info(this.paciente);
              } else {
                console.error('El cuerpo de la respuesta es nulo.');
              }
  
            },
            error: err => {
              swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
              console.error("Error al obtener el paciente: ", err);
            },
            complete: () => {
              console.log('Pacientes loaded');
            }
          });
        }
      });
  
  
    }

  }