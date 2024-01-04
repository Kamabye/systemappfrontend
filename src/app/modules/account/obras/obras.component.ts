import { Component, OnInit } from '@angular/core';
import { Obra } from 'src/app/models/obra';

import { ObraService } from 'src/app/services/obra.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.css'
})
export class ObrasComponent implements OnInit {


  public obras: Obra[] = [];

  constructor(private obraService: ObraService) {

  }
  ngOnInit(): void {
    console.info("ObrasComponent ngOnInit");
    //this.cargarObras();
    this.cargarObrasJSON();


  }

  eliminarObra(_t30: Obra) {
    throw new Error('Method not implemented.');
  }


  cargarObras() {
    this.obraService.getObras().subscribe(
      (response) => {
        console.info("ObrasComponent response");
        if (response.body != null) {
          this.obras = response.body;
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      (error) => {
        swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener las obras: ", error);
      }
    );
  }

  cargarObrasJSON() {
    this.obraService.getObrasJSON().subscribe(
      (response) => {
        console.info("ObrasComponent response");
        if (response != null) {
          this.obras = response;
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      (error) => {
        swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener las obras: ", error);
      }
    );
  }

}