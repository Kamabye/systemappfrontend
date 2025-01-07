import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Obra } from 'src/app/models/obra';
import { Partitura } from 'src/app/models/partitura';

import { ObraService } from 'src/app/services/obra.service';
//import { PartituraService}

import Swal from 'sweetalert2';

@Component({
  selector: 'app-obraform',
  templateUrl: './obraform.component.html'
})
export class ObraformComponent implements OnInit {

  public obra: Obra = new Obra();
  public audio: File = new File([], '');

  public partituras: Partitura[] = [];
  //public rolesSeleccionados: Rol[] = [];
  //opcionesSeleccionadas: number[] = [];

  constructor(private obraService: ObraService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.info("ObraformComponent ngOnInit()")
    this.cargarObra()
    //this.cargarObraJSON()


  }
  cargarObraJSON() {

    this.activateRoute.params.subscribe(params => {
      let idObra = params['idObra']

      if (idObra) {
        this.obraService.getObraJSON(idObra).subscribe(
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
            Swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
            console.error("Error al obtener el usuario: ", error);
          })
      }
    });
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
            Swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
            console.error("Error al obtener el usuario: ", error);
          })
      }
    })
  }

  handleFileInput(event: any): void {
    this.audio = event.target.files[0];
  }

  crearObraFormData(): void {
    const formData = new FormData();
    formData.set('audio', this.audio);
    //const obraJSON = JSON.stringify(this.obra, null, 2);
    const obraJSON = JSON.stringify(this.obra);
    formData.set('obraJSON', obraJSON);


    this.obraService.crearObraFormData(formData,)
      .subscribe(
        {
        next : data => {
          if (data.body !== null) {
            this.router.navigate(['/admin/obra'])
            Swal.fire('Mensaje', `Obra: ${data.body.nombre} creado con éxito!`, 'success')
          } else {
            console.error('El cuerpo de la respuesta es nulo.');
          }

        }
      ,
        error : err => {
          this.router.navigate(['/account/obra'])
          Swal.fire('Mensaje', `${err.error.mensaje}`, 'warning')
          console.error("Error al crear la obra: ", err);
        }
      }
      );

  }

  crearObra(): void {

    this.obraService.crearObra(this.obra)
      .subscribe(
        {
        next : data => {
          if (data.body !== null) {
            this.router.navigate(['/admin/obra'])
            Swal.fire('Mensaje', `Obra: ${data.body.nombre} creado con éxito!`, 'success')
          } else {
            console.error('El cuerpo de la respuesta es nulo.');
          }

        }
      ,
        error : err => {
          this.router.navigate(['/account/obra'])
          Swal.fire('Mensaje', `${err.error.mensaje}`, 'warning')
          console.error("Error al crear la obra: ", err);
        }
      }
      );

  }

  actualizarObra(): void {
    const formData = new FormData();
    formData.set('audio', this.audio);
    const obraJSON = JSON.stringify(this.obra, null, 2);
    formData.set('obraJSON', obraJSON);


    this.obraService.actualizarObraFormData(formData, this.obra.idObra)
      .subscribe(
        response => {
          if (response.body != null) {
            this.router.navigate(['/account/obra'])
            Swal.fire('Mensaje', `Obra: ${response.body.nombre} creado con éxito!`, 'success')
          } else {
            console.error('El cuerpo de la respuesta es nulo.');
          }

        },
        error => {
          this.router.navigate(['/account/obra'])
          Swal.fire('Mensaje', `${error.error.mensaje}`, 'warning')
          console.error("Error al crear la obra: ", error);
        }
      );

  }


  actualizarObraFormData(): void {
    const formData = new FormData();
    formData.set('audio', this.audio);
    const obraJSON = JSON.stringify(this.obra, null, 2);
    formData.set('obraJSON', obraJSON);


    this.obraService.actualizarObraFormData(formData, this.obra.idObra)
      .subscribe(
        response => {
          if (response.body != null) {
            this.router.navigate(['/account/obra'])
            Swal.fire('Mensaje', `Obra: ${response.body.nombre} creado con éxito!`, 'success')
          } else {
            console.error('El cuerpo de la respuesta es nulo.');
          }

        },
        error => {
          this.router.navigate(['/account/obra'])
          Swal.fire('Mensaje', `${error.error.mensaje}`, 'warning')
          console.error("Error al crear la obra: ", error);
        }
      );

  }
}