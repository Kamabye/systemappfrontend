import { Component } from '@angular/core';
import { Rol } from './rol';
import { RolService } from './rol.service';
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
      let id = params['id']
      if(id){
        this.rolService.obtenerRol(id).subscribe( (rol) => this.rol = rol)
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



}
