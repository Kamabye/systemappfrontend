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
      (datos) => { 
        this.roles = datos; 

      },
      (error) => {
        if (error.status === 404) {
          console.log('Recurso no encontrado');
          // Puedes mostrar un mensaje al usuario o redirigir a otra página
        } else {
          console.error('Error inesperado', error);
        }
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
            'Rol eliminado con éxito',
            'success'
          )
        })

      }
    })
  }
}
