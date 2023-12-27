import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from 'src/app/models/usuario';

import { Rol } from 'src/app/models/rol';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-formusuario',
  templateUrl: './formusuario.component.html'
})
export class FormusuarioComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public imagen: File = new File([], '');


  public roles: Rol[] = [];
  public rolesSeleccionados: Rol[] = [];
  opcionesSeleccionadas: number[] = [];

  constructor(private usuarioService: UsuarioService, private rolService: RolService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.info("FormusuarioComponent ngOnInit()")
    this.rolService.getRoles().subscribe(
      (response) => {
        if (response.body !== null) {
          this.roles = response.body;
        }
        else {
          console.error('El cuerpo de la respuesta es nulo.');
        }
      },
      error => {
        swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener el usuario: ", error);
      }


    )

    this.cargarUsuario()


  }

  onSelectChange(event: any) {
    const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option: any) => option.value);
    this.usuario.roles = this.roles.filter(rol => opcionesSeleccionadas.includes(rol.id.toString()));
  }

  handleFileInput(event: any): void {
    this.imagen = event.target.files[0];
  }

  cargarUsuario(): void {
    console.info("FormusuarioComponent cargarUsuario()")
    this.activateRoute.params.subscribe(params => {

      let idUsuario = params['idUser']

      if (idUsuario) {
        this.usuarioService.obtenerUsuario(idUsuario).subscribe(
          (response) => {
            if (response.body !== null) {
              this.usuario = response.body;
              console.info(this.usuario);
            } else {
              console.error('El cuerpo de la respuesta es nulo.');
            }

          },
          error => {
            this.router.navigate(['/admin/user'])
            swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
            console.error("Error al obtener el usuario: ", error);
          })
      }
    })


  }

  public crearUsuario(): void {
    this.usuarioService.crearUsuario(this.usuario)
      .subscribe(
        response => {
          if (response.body !== null) {
            this.router.navigate(['/admin/user'])
            swal.fire('Mensaje', `Usuario: ${response.body.email} creado con éxito!`, 'success')
          } else {
            console.error('El cuerpo de la respuesta es nulo.');
          }

        },
        error => {
          this.router.navigate(['/admin/user'])
          swal.fire('Mensaje', `${error.error.mensaje}`, 'warning')
          console.error("Error al crear el usuario: ", error);
        }
      );
  }

  public crearUsuarioFormData(): void {
    const formData = new FormData();
    formData.set('imagen', this.imagen);
    const usuarioJSON = JSON.stringify(this.usuario, null, 2);
    formData.set('usuarioJSON', usuarioJSON);


    this.usuarioService.crearUsuarioFormData(formData)
      .subscribe(
        response => {
          if (response.body !== null) {
            this.router.navigate(['/admin/user'])
            swal.fire('Mensaje', `Usuario: ${response.body.email} creado con éxito!`, 'success')
          } else {
            console.error('El cuerpo de la respuesta es nulo.');
          }

        },
        error => {
          this.router.navigate(['/admin/user'])
          swal.fire('Mensaje', `${error.error.mensaje}`, 'warning')
          console.error("Error al crear el usuario: ", error);
        }
      );
  }

  public actualizarUsuario(): void {
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      response => {
        this.router.navigate(['/admin/user'])
        swal.fire('El Usuario', `El Usuario ${response.body?.email} fue modificado con éxito!`, 'success')
      })
  }

  public actualizarUsuarioFormData(): void {
    const formData = new FormData();
    formData.set('imagen', this.imagen);
    const usuarioJSON = JSON.stringify(this.usuario, null, 2);
    formData.set('usuarioJSON', usuarioJSON);

    this.usuarioService.actualizarUsuarioFormData(formData).subscribe(
      response => {
        if (response.body !== null) {
          this.router.navigate(['/admin/user'])
          swal.fire('El Usuario', `El Usuario ${response.body?.email} fue modificado con éxito!`, 'success')
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      error => {
        this.router.navigate(['/admin/user'])
        swal.fire('Mensaje', `${error.error.mensaje}`, 'warning')
        console.error("Error al crear el usuario: ", error);
      })
  }
}