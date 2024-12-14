import { Component, OnInit } from '@angular/core';

import { Page } from 'src/app/interfaces/page';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { FormControl } from '@angular/forms';

import swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html'
})
export class PacienteComponent implements OnInit {

  pacientes: Paciente[] = []; 
  page: Page<Paciente> | undefined;
  currentPage = 0;
  pageSize = 10;
  searchControl = new FormControl();

  constructor(private pacienteService: PacienteService) { }


  ngOnInit(): void {
    console.info("PacienteComponent ngOnInit()");


    this.searchControl.setValue('');

    this.searchControl.valueChanges.pipe(
      debounceTime(1000), // Espera 1000ms después de que el usuario deje de escribir
      distinctUntilChanged() // Evita emitir si el valor es el mismo que el anterior
    ).subscribe(searchTerm => {
      this.pacientes = [];
      this.currentPage = 0;
      this.fetchPacientes(searchTerm);

    });
    ;



    this.loadPacientes();
  }

  fetchPacientes(searchTerm: string) {
    this.pacienteService.getPacientesByString(this.currentPage, this.pageSize, searchTerm).pipe(
      switchMap((response: any) => {
        this.page = response.body;
        this.pacientes = this.page?.content ?? [];
        return of(response); // Emitir la respuesta para que la suscripción la reciba
      })
    ).subscribe();
  }

  loadPacientes(): void {
    this.pacienteService.getPacientesByString(this.currentPage, this.pageSize, this.searchControl.value).subscribe({
      next: data => {
        if (data) {
          this.page = data.body!;
          this.pacientes = this.page?.content ?? [];
        } else {
          swal.fire('Sin datos', '', 'warning')
          console.error('No data in response');
          this.pacientes = [];
        }
      },
      error: err => {
        swal.fire('Error al cargar los datos', `${err.error.mensaje}`, 'warning')
        console.error("Error al obtener los pacientes: ", err);
      },
      complete: () => {
        console.log('Pacientes loaded');
      }
    }
    );
  }

  public eliminarPaciente(paciente: Paciente): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar al paciente ${paciente.nombres}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminiar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.eliminarPaciente(paciente.idPaciente).subscribe(response => {

          this.pacientes = this.pacientes.filter(r => r != paciente)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Paciente ${response.body?.nombres} eliminado con éxito`,
            'success'
          )
        })

      }
    })
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPacientes();
  }

}
