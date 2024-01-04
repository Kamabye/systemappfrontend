import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Obra } from 'src/app/models/obra';
import { Partitura } from 'src/app/models/partitura';

import { ObraService } from 'src/app/services/obra.service';
//import { PartituraService}

import swal from 'sweetalert2';

@Component({
  selector: 'app-obraform',
  templateUrl: './obraform.component.html'
})
export class ObraformComponent implements OnInit {

  public obra: Obra = new Obra();
  public imagen: File = new File([], '');

  public partituras: Partitura[] = [];
  //public rolesSeleccionados: Rol[] = [];
  //opcionesSeleccionadas: number[] = [];

  constructor(private obraService: ObraService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.info("ObraformComponent ngOnInit()")
    //this.cargarObra()
    this.cargarObraJSON()


  }
  cargarObraJSON() {
    this.obraService.getObraJSON(1).subscribe(
      (response) => {
        if (response != null) {
          this.obra = response;
          console.info(this.obra);
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      error => {
        this.router.navigate(['/admin/obras'])
        swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener el usuario: ", error);
      })
  }

  cargarObra(): void {
    console.info("ObraformComponent cargarObra()")
    this.activateRoute.params.subscribe(params => {

      let idObra = params['idObra']

      if (idObra) {
        this.obraService.getObra(idObra).subscribe(
          (response) => {
            if (response.body !== null) {
              this.obra = response.body;
              console.info(this.obra);
            } else {
              console.error('El cuerpo de la respuesta es nulo.');
            }

          },
          error => {
            this.router.navigate(['/admin/obras'])
            swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
            console.error("Error al obtener el usuario: ", error);
          })
      }
    })
  }

  handleFileInput(event: any): void {
    this.imagen = event.target.files[0];
  }

  crearObraFormData(): void {
  }
  actualizarObraFormData(): void {}
}