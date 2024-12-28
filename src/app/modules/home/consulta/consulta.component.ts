import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

import { Page } from 'src/app/interfaces/page';
import { Paciente } from 'src/app/models/paciente';
import { Consulta } from 'src/app/models/consulta';
import { PacienteService } from 'src/app/services/paciente.service';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html'
})
export class ConsultaComponent implements OnInit {

    public paciente: Paciente = new Paciente();
    consultas: Consulta[] = [];
    //page: Page<Consulta> | undefined;
    //currentPage = 0;
    //pageSize = 3;
    //searchControl = new FormControl();

    constructor(
        private pacienteService: PacienteService,
        private consultaService: ConsultaService,
        private router: Router,
        private activateRoute: ActivatedRoute) { }

    ngOnInit(): void {
        console.log("ConsultaComponent ngOnInit()")
        this.cargarpaciente();
    }

    cargarpaciente(): void {
        console.log("ConsultaComponent cargarpaciente()")
        this.activateRoute.paramMap.subscribe(params => {

            const idPacienteString = params.get('idPaciente'); // Obtiene el valor del parámetro 'idPaciente' (como string)

            if (idPacienteString) {
                const idPaciente = Number(idPacienteString); // Intenta convertir a número
                if (!isNaN(idPaciente)) { // Verifica si la conversión fue exitosa

                    console.info("idPaciente presente. Cargando paciente...");
                    this.pacienteService.getPaciente(idPaciente).subscribe({
                        next: data => {
                            if (data.body !== null) {
                                this.paciente = data.body;
                                //console.info(this.paciente);
                                //console.info("Datos del paciente");
                                this.loadConsultas();
                            } else {
                                console.error('El cuerpo de la respuesta es nulo.');
                            }

                        },
                        error: err => {
                            Swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
                            console.error("Error al obtener el paciente: ", err);
                        },
                        complete: () => {
                            console.log('ConsultaComponent cargarPaciente complete');
                        }
                    });

                } else {

                    console.error('El parámetro "idPaciente" no es un número válido.');
                    //Aquí podrías redireccionar a una página de error o mostrar un mensaje al usuario
                }
            } else {

                console.error('El parámetro "idPaciente" no está presente en la URL.');
                //Aquí podrías redireccionar a una página de error o mostrar un mensaje al usuario
            }
        });


    }

    loadConsultas() {
        console.log("ConsultaComponent loadConsultas()");
        this.consultaService.getConsultasByPaciente(this.paciente.idPaciente).subscribe({
            next: data => {
                if (data) {
                    this.consultas = data.body?.content ?? [];
                } else {
                    this.router.navigate(['/home/paciente'])
                    Swal.fire('Mensaje', `paciente: ${this.paciente.idPaciente} no tiene consultas!`, 'warning')
                    console.error('El paciente no tiene consultas');
                }
            },
            error: err => {
                Swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
                console.error("Error al obtener las consultas: ", err);
            },
            complete: () => {
                console.log('ConsultaComponent loadConsultas complete');
            }
        }
        );
    }

}