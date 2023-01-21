import { Component, OnInit } from '@angular/core';
import { Rol } from './rol';
import { RolService } from './rol.service';


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
})
export class RolComponent implements OnInit {

  roles: Rol[] = [];

constructor(private rolService : RolService){}

ngOnInit() {
  this.rolService.getRoles().subscribe(
    roles => this.roles = roles
  );
}
}
