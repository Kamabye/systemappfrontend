import { Component, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true, // Marca el componente como standalone
  imports: [RouterOutlet], // Añade RouterOutlet a los imports
  template: `<router-outlet></router-outlet>`, // Ejemplo con enrutamiento
  styleUrls: []
})

export class AppComponent implements OnInit {

  ngOnInit(): void {
    //console.log("AppComponent ngOnInit()");
  }
}