import { Component } from '@angular/core';
import { Rol } from '../../models/rol';
import { RolService } from '../../services/rol.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formrol',
  templateUrl: './formrol.component.html'
})
export class FormrolComponent {

  public rol : Rol = new Rol();

  constructor(private rolService : RolService, private router : Router, private activateRoute: ActivatedRoute){

  }

  ngOnInit() {
    this.cargarRol()
  }


  cargarRol(): void{
    this.activateRoute.params.subscribe(params =>{
      let idRol = params['idRol']
      if(idRol){
        this.rolService.obtenerRol(idRol).subscribe( (rol) => this.rol = rol)
      }
    }
    )
  }

  public crearRol(): void{
    this.rolService.crearRol(this.rol)
    .subscribe(response => {
      this.router.navigate(['/roles'])
      swal.fire('Nuevo Rol', `Rol ${response.rol} creado con éxito!`,'success')
    }
    );
  }

  public actualizarRol() : void{
    this.rolService.actualizarRol(this.rol).subscribe( response => {
      this.router.navigate(['/roles'])
      swal.fire('El Rol', `Rol ${response.rol} fue modificado con éxito!`,'success')
    })
  }




}
