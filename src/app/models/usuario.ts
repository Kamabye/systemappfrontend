import { Rol } from "./rol";

export class Usuario {
    id: number = 0;
    username : string = '';
    password : string = '';
    nombres : string = '';
    apellidoPaterno : string = '';
    apellidoMaterno : string = '';
    email : string = '';
    estatus : boolean = true;
    createdAt: Date = new Date();
    modifiedAt: Date = new Date();
    imagen: number[] = [];
    roles : Rol[] = [];
}