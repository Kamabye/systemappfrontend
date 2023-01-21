import { Component } from '@angular/core';
import { Rol } from './rol';
import { RolService } from './rol.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formrol',
  templateUrl: './formrol.component.html'
})
export class FormrolComponent {

  public rol : Rol = new Rol();

  constructor(private rolService : RolService, private router : Router){

  }

  public crearRol(): void{
    this.rolService.crearRol(this.rol)
    .subscribe(response => {
      this.router.navigate(['/roles'])
      swal.fire('Nuevo Rol', `Rol ${response.rol} creado con éxito!`,'success')
    }
    );
  }



}
