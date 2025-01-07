import { Component, OnInit } from '@angular/core';
import { Obra } from 'src/app/models/obra';

import { ObraService } from 'src/app/services/obra.service';

import Swal from 'sweetalert2';

import { DomSanitizer } from '@angular/platform-browser';

import { FormControl } from '@angular/forms';

import { Page } from 'src/app/interfaces/page';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html'
})
export class ObrasComponent implements OnInit {

  public obras: Obra[] = [];
  page: Page<Obra> | undefined;

  public domSanitizer: DomSanitizer;

  currentPage = 0;
  pageSize = 10;
  searchControl = new FormControl();

  constructor(private obraService: ObraService, private domSanitizer1: DomSanitizer) {
    this.domSanitizer = domSanitizer1;
  }
  ngOnInit(): void {
    console.info("ObrasComponent ngOnInit");
    //this.cargarObras();
    this.searchControl.setValue('');

    this.searchControl.valueChanges.pipe(
      debounceTime(1000), // Espera 1000ms después de que el usuario deje de escribir
      distinctUntilChanged() // Evita emitir si el valor es el mismo que el anterior
    ).subscribe(searchString => {
      this.obras = [];
      this.currentPage = 0;
      this.fetchObras(searchString);

    })
      ;

    this.cargarObras();


  }

  fetchObras(searchString: string) {

    this.obraService.getObrasbyNombre(this.currentPage, this.pageSize, searchString).pipe(
      switchMap((response: any) => {
        //this.page = response.body;
        //this.obras = this.page?.content ?? [];
        this.obras = response.body;
        console.log("ObrasComponent fetchPacientes");
        return of(response); // Emitir la respuesta para que la suscripción la reciba
      })
    ).subscribe();
  }

  cargarObras() {
    this.obraService.getObras(this.currentPage, this.pageSize, "").subscribe({
      next: data => {
        //console.info("ObrasComponent response");
        if (data) {
          if (data.status === 204) {
            Swal.fire('Mensaje: ', 'No hay datos para mostrar', 'warning');
          }
          else {
            this.obras = data.body!;
          }
        }

      },
      error: err => {
        Swal.fire('Mensaje: ', `${err.error.error}`, 'error')
        console.error("Error al obtener las obras: ", err);
      },
      complete: () => {
        console.log('loadObras complete');
      }
    }
    );
  }

  eliminarObra(obra: Obra) {


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar el objeto ${obra.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminiar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.obraService.eliminarObra(obra.idObra).subscribe(response => {

          this.obras = this.obras.filter(r => r != obra)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Obra ${response.body?.nombre} eliminado con éxito`,
            'success'
          )
        })

      }
    })
  }




  cargarObrasJSON() {
    this.obraService.getObrasJSON().subscribe(
      (response) => {
        console.info("ObrasComponent response");
        if (response != null) {
          this.obras = response;
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      (error) => {
        Swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener las obras: ", error);
      }
    );
  }

  agregarObraShopCart(_t46: Obra) {
    throw new Error('Method not implemented.');
  }
  comprarObra(_t46: Obra) {
    throw new Error('Method not implemented.');
  }

  onPageChange(page: number): void {
    console.log('PacienteComponent onPageChange');
    this.currentPage = page;
    this.cargarObras();
  }

}