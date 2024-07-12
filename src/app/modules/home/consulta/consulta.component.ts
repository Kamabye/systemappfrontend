import { Component, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { FormControl } from '@angular/forms';

import swal from 'sweetalert2';

import { Page } from 'src/app/interfaces/page';
import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html'
})
export class ConsultaComponent implements OnInit {

    consultas: Consulta[] = [];
    page: Page<Consulta> | undefined;
    currentPage = 0;
    pageSize = 3;
    searchControl = new FormControl();

    constructor(private consultaService: ConsultaService) { }

    ngOnInit(): void {
        this.loadConsultas();
    }

    loadConsultas() {


        console.info("UsersComponent ngOnInit()");
        this.consultaService.getConsultas(this.currentPage, this.pageSize, 0).subscribe({
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