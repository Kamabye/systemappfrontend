import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-formrol',
  templateUrl: './formrol.component.html'
})


export class FormrolComponent implements OnInit {

  public rol: Rol = new Rol();

  constructor(private rolService: RolService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.info("FormrolComponent ngOnInit()");
    this.cargarRol()
  }


  cargarRol(): void {
    console.info("FormrolComponent cargarRol()");
    this.activateRoute.params.subscribe(params => {

      let idRol = params['idRol']

      if (idRol) {
        this.rolService.obtenerRol(idRol).subscribe(
          (response) => {

            if (response.body !== null) {
              this.rol = response.body;
            } else {
              console.error('El cuerpo de la respuesta es nulo.');
            }

          },
          error => {
            this.router.navigate(['admin/rol'])
            Swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
            console.error("Error al obtener el rol: ", error);
          })
      }

    }
    )
  }

  public crearRol(): void {
    this.rolService.crearRol(this.rol)
      .subscribe(
        response => {
          if (response.body !== null) {
            this.router.navigate(['admin/rol'])
            Swal.fire('Mensaje', `Rol: ${response.body.rol} creado con éxito!`, 'success')
          } else {
            console.error('El cuerpo de la respuesta es nulo.');
          }

        },
        error => {
          this.router.navigate(['admin/rol'])
          Swal.fire('Mensaje', `${error.error.mensaje}`, 'warning')
          console.error("Error al crear el rol: ", error);
        }
      );
  }

  public actualizarRol(): void {
    this.rolService.actualizarRol(this.rol).subscribe(
      response => {
        this.router.navigate(['admin/rol'])
        Swal.fire('El Rol', `Rol ${response.body?.rol} fue modificado con éxito!`, 'success')
      })
  }
}
