import { Component, OnInit } from '@angular/core';
import { Obra } from 'src/app/models/obra';

import { ObraService } from 'src/app/services/obra.service';

import Swal from 'sweetalert2';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.css'
})
export class ObrasComponent implements OnInit {

  public obras: Obra[] = [];

  public domSanitizer: DomSanitizer;

  constructor(private obraService: ObraService, private domSanitizer1: DomSanitizer) {
    this.domSanitizer = domSanitizer1;
  }
  ngOnInit(): void {
    console.info("ObrasComponent ngOnInit");
    //this.cargarObras();
    this.cargarObrasJSON();


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
        this.obraService.eliminarObra(obra.id).subscribe(response => {

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


  cargarObras() {
    this.obraService.getObras().subscribe(
      (response) => {
        //console.info("ObrasComponent response");
        if (response.body != null) {
          this.obras = response.body;
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

}