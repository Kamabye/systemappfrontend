import { Rol } from "./rol";

export class Usuario {
    idUsuario: number = 0;
    username : string = '';
    password : string = '';
    nombres : string = '';
    primerApellido : string = '';
    segundoApellido : string = '';
    email : string = '';
    dia: number = 0;
    mes: number = 0;
    anio: number = 0;
    estatus : boolean = true;
    estatusBloqueo : boolean = true;

    dateOfBirth: Date = new Date();
    createdAt: Date = new Date();
    modifiedAt: Date = new Date();
    roles : Rol[] = [];
}