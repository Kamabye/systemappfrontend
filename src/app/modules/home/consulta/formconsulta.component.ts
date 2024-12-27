import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

import Swal from 'sweetalert2';

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

    this.cargarconsulta();
    this.cargarpaciente()

  }
  cargarconsulta() {
    console.info("FormpconsultaComponent cargarconsulta()")
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
            Swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
            console.error("Error al obtener la consulta: ", err);
          },
          complete: () => {
            console.log('Consulta loaded');
          }
        });
      }
    });
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
            Swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
            console.error("Error al obtener el paciente: ", err);
          },
          complete: () => {
            console.log('Pacientes loaded');
          }
        });
      }
    });


  }

  public crearConsulta(): void {
    this.consulta.paciente = this.paciente;
    console.log(this.consulta);
    this.consultaService.crearConsulta(this.consulta).subscribe({
      next: data => {
        if (data) {
          this.consulta = data.body!;
          this.router.navigate(['/home/paciente'])
          Swal.fire('Mensaje', `consulta: ${data.body?.idConsulta} creado con éxito!`, 'success')
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }
      },
      error: err => {
        this.router.navigate(['/home/paciente']);
        Swal.fire('Mensaje', `${err.error.mensaje}`, 'warning');
        console.error("Error al crear la consulta: ", err);
      },
      complete: () => {
        console.log('Consulta guardada exitosamente');
      }
    });
  }

  eliminarConsulta() {
    throw new Error('Method not implemented.');
  }
  actualizarConsulta() {
    throw new Error('Method not implemented.');
  }



}