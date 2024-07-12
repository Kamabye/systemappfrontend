import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Paciente } from 'src/app/models/paciente';

import { PacienteService } from 'src/app/services/paciente.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-formpaciente',
  templateUrl: './formpaciente.component.html'
})
export class FormpacienteComponent implements OnInit {

  public paciente: Paciente = new Paciente();

  constructor(private pacienteService: PacienteService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.info("FormpacienteComponent ngOnInit()")

    this.cargarpaciente()

  }

  cargarpaciente(): void {
    console.info("FormpacienteComponent cargarpaciente()")
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

  public crearpaciente(): void {
    this.pacienteService.crearPaciente(this.paciente)
      .subscribe(
        data => {
          if (data.body !== null) {
            this.router.navigate(['/home/paciente'])
            swal.fire('Mensaje', `paciente: ${data.body.email} creado con éxito!`, 'success')
          } else {
            console.error('El cuerpo de la respuesta es nulo.');
          }

        },
        error => {
          this.router.navigate(['/home/paciente'])
          swal.fire('Mensaje', `${error.error.mensaje}`, 'warning')
          console.error("Error al crear el paciente: ", error);
        }
      );
  }

  public actualizarpaciente(): void {
    this.pacienteService.patchUpdatePaciente(this.paciente).subscribe({

      next: data => {
        if (data.body !== null) {
          this.router.navigate(['/home/paciente'])
          swal.fire('El paciente', `El paciente ${data.body?.nombres} fue modificado con éxito!`, 'success')
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
    })
  }

  public eliminarPaciente(): void {
    this.pacienteService.eliminarPaciente(this.paciente.idPaciente).subscribe(
      data => {
        this.router.navigate(['/home/paciente'])
        swal.fire('El paciente', `El paciente ${data.body?.nombres} fue eliminado con éxito!`, 'success')
      })
  }

}