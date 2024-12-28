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

  constructor(
    private pacienteService: PacienteService,
    private consultaService: ConsultaService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    console.info("FormConsultaComponent ngOnInit()");

    this.activateRoute.paramMap.subscribe(params => {
      const idPacienteString = params.get('idPaciente'); // Obtiene el valor del parámetro 'idPaciente' (como string)
      if (idPacienteString) {
        const idPaciente = Number(idPacienteString); // Intenta convertir a número
        if (!isNaN(idPaciente)) { // Verifica si la conversión fue exitosa

          console.info("idPaciente presente. Cargando paciente...");
          this.cargarpaciente(idPaciente);

        } else {

          console.error('El parámetro "idPaciente" no es un número válido.');
          //Aquí podrías redireccionar a una página de error o mostrar un mensaje al usuario
        }
      } else {

        console.error('El parámetro "idPaciente" no está presente en la URL.');
        //Aquí podrías redireccionar a una página de error o mostrar un mensaje al usuario
      }


      const idConsultaString = params.get('idConsulta'); // Obtiene el valor del parámetro 'idPaciente' (como string)
      if (idConsultaString) {
        const idConsulta = Number(idConsultaString); // Intenta convertir a número
        if (!isNaN(idConsulta)) { // Verifica si la conversión fue exitosa

          console.info("idConsulta presente. Cargando consulta...");
          this.cargarconsulta(idConsulta);

        } else {

          console.error('El parámetro "idConsulta" no es un número válido.');
          //Aquí podrías redireccionar a una página de error o mostrar un mensaje al usuario
        }
      } else {

        console.error('El parámetro "idConsulta" no está presente en la URL.');
        //Aquí podrías redireccionar a una página de error o mostrar un mensaje al usuario
      }

    });

  }
  cargarconsulta(idConsulta: number) {
    console.info("FormpconsultaComponent cargarconsulta(idConsulta)")

    this.consultaService.getConsulta(idConsulta).subscribe({
      next: data => {
        if (data.body !== null) {
          this.consulta = data.body;
          this.cargarPacienteByIdConsulta(this.consulta.idConsulta);
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      error: err => {
        Swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
        console.error("Error al obtener la consulta: ", err);
      },
      complete: () => {
        console.log('FormpconsultaComponent cargarconsulta complete:');
      }
    });
  }

  cargarpaciente(idPaciente: number): void {
    console.log("FormpconsultaComponent cargarpaciente(idPaciente)");
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
        console.log('FormConsultaComponent cargarPaciente complete:');
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
          Swal.fire('Mensaje', `Consulta: ${data.body?.idConsulta} creada con éxito!`, 'success')
          console.log('Consulta creada con exito');
          this.router.navigate(['/home/paciente'])
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
        console.log('FormConsultaComponente crearConsulta complete');
      }
    });
  }

  eliminarConsulta() {
    throw new Error('Method not implemented.');
  }

  
  actualizarConsulta() {
    console.log('FormConsultaComponente actualizarConsulta');
    console.info(this.consulta);
    this.consultaService.patchUpdateConsulta(this.consulta).subscribe({
          next: data => {
            if (data.body !== null) {
              //Por defecto se redirecciona al home/paciente, pero podria redirigir a las consultas del paciente
              this.router.navigate(['/home/paciente'])
              Swal.fire('Mensaje:', `La consulta ${data.body?.idConsulta} fue modificada con éxito!`, 'success')
            } else {
              console.error('El cuerpo de la respuesta es nulo.');
            }
    
          },
          error: err => {
            Swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
            console.error("Error al obtener la consulta: ", err);
          },
          complete: () => {
            console.log('FormConsultaComponente actualizarConsulta complete:');
          }
        });
  }

  cargarPacienteByIdConsulta(idConsulta: number) {
    console.info("FormConsultaComponente cargarPacienteByIdConsulta");
    this.consultaService.getPacienteByIdConsulta(idConsulta).subscribe({
      next: data => {
        if (data.body !== null) {
          this.paciente = data.body;
          //console.info(this.paciente);
          //this.consulta.paciente = this.paciente;
          //console.info(this.consulta);
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      error: err => {
        Swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
        console.error("Error al obtener el paciente: ", err);
      },
      complete: () => {
        console.log('FormConsultaComponente cargarPacienteByIdConsulta complete:');
      }
    });
  }



}