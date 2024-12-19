import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { FormControl } from '@angular/forms';

import swal from 'sweetalert2';

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
    page: Page<Consulta> | undefined;
    currentPage = 0;
    pageSize = 3;
    searchControl = new FormControl();

    constructor(private pacienteService: PacienteService, private consultaService: ConsultaService, private router: Router, private activateRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.cargarpaciente();
    }

    cargarpaciente(): void {
        console.info("ConsultaComponent cargarpaciente()")
        this.activateRoute.params.subscribe(params => {

            let idPaciente = params['idPaciente']

            if (idPaciente) {
                this.pacienteService.getPaciente(idPaciente).subscribe({
                    next: data => {
                        if (data.body !== null) {
                            this.paciente = data.body;
                            console.info(this.paciente);
                            console.info("Datos del paciente");
                            this.loadConsultas();
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

    loadConsultas() {
        console.info("Cargar consultas ConsultaComponent ngOnInit()");
        this.consultaService.getConsultasByPaciente(this.currentPage, this.pageSize, this.paciente.idPaciente).subscribe({
            next: data => {
                if (data) {
                    this.page = data.body!;
                    this.consultas = data.body?.content ?? [];
                } else {
                    console.error('No data in response');
                    this.consultas = [];
                }
            },
            error: err => {
                swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
                console.error("Error al obtener los pacientes: ", err);
            },
            complete: () => {
                console.log('Pacientes loaded');
            }
        }
        );
    }

    eliminarConsulta(_t38: Consulta) {
        throw new Error('Method not implemented.');
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadConsultas();
    }


}