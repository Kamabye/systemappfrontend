import { Component, OnInit } from '@angular/core';

import { Page } from 'src/app/interfaces/page';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

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
    console.log("PacienteComponent ngOnInit()");

    this.searchControl.setValue('');

    this.searchControl.valueChanges.pipe(
      debounceTime(1000), // Espera 1000ms después de que el usuario deje de escribir
      distinctUntilChanged() // Evita emitir si el valor es el mismo que el anterior
    ).subscribe(searchString => {
      this.pacientes = [];
      this.currentPage = 0;
      this.fetchPacientes(searchString);

    });
    ;

    this.loadPacientes();
  }

  fetchPacientes(searchString: string) {

    this.pacienteService.getPacientesByString(this.currentPage, this.pageSize, searchString).pipe(
      switchMap((response: any) => {
        this.page = response.body;
        this.pacientes = this.page?.content ?? [];
        console.log("PacienteComponent fetchPacientes");
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
          console.log("PacienteComponent loadPacientes sucess");
        } else {
          Swal.fire('Sin datos', '', 'warning')
          console.info(`no se encontraron datos de pacientes ${data}`);
          this.pacientes = [];
        }
      },
      error: err => {
        Swal.fire('Error al obtener los pacientes', `${err.error.mensaje}`, 'warning')
        console.error("Error al obtener los pacientes: ", err);
      },
      complete: () => {
        console.log('loadPacientes complete');
      }
    }
    );
  }

  public eliminarPaciente(paciente: Paciente): void {
    console.log('PacienteComponent eliminarPaciente');

    const SwalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    SwalWithBootstrapButtons.fire({
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
          SwalWithBootstrapButtons.fire(
            'Eliminado!',
            `Paciente ${response.body?.nombres} eliminado con éxito`,
            'success'
          )
        })

      }
    })
  }

  onPageChange(page: number): void {
    console.log('PacienteComponent onPageChange');
    this.currentPage = page;
    this.loadPacientes();
  }

}
