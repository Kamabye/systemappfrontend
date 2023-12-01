import { Component, OnInit } from '@angular/core';
import { Rol } from '../../models/rol';
import { RolService } from '../../services/rol.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { IRol } from 'src/app/interfaces/rol';

@Component({
  selector: 'app-formrol',
  templateUrl: './formrol.component.html'
})
export class FormrolComponent implements OnInit {

  public rol: Rol = new Rol();

  constructor(private rolService: RolService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.cargarRol()
  }


  cargarRol(): void {
    this.activateRoute.params.subscribe(params => {
      let idRol = params['idRol']
      if (idRol) {
        this.rolService.obtenerRol(idRol).subscribe(
          (response) => {
            if (response.body !== null) {
              this.rol = response.body;
              console.log('Rol obtenido exitosamente:', this.rol);
            } else {
              console.error('El cuerpo de la respuesta es nulo.');
            }
          },
          error => {
            console.error("Error: ", error);
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
            this.router.navigate(['/roles'])
            swal.fire('Nuevo Rol', `Rol ${response.body} creado con éxito!`, 'success')
          } else {
            console.error('El cuerpo de la respuesta es nulo.');
          }

        },
        error => {
          swal.fire('Error: ', "Al parecer hubo un error", 'warning')
          console.error("Error: ", error);
        }
      );
  }

  public actualizarRol(): void {
    this.rolService.actualizarRol(this.rol).subscribe(response => {
      this.router.navigate(['/roles'])
      swal.fire('El Rol', `Rol ${response.rol} fue modificado con éxito!`, 'success')
    })
  }




}
