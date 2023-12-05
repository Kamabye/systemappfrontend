import { Component, OnInit } from '@angular/core';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/rol';

import swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
})


export class RolComponent implements OnInit {

  roles: Rol[] = [];

  constructor(private rolService: RolService) { }

  ngOnInit() {
    this.rolService.getRoles().subscribe(
      (response) => {

        if (response.body !== null) {
          this.roles = response.body;
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      (error) => {
        swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener los roles: ", error);
      }
    );
  }

  public eliminarRol(rol: Rol): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar al rol ${rol.rol}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminiar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolService.eliminarRol(rol.id).subscribe(response => {

          this.roles = this.roles.filter(r => r !== rol)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Rol ${response.body?.rol} eliminado con éxito`,
            'success'
          )
        })

      }
    })
  }
}
