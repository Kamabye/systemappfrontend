import { Consulta } from "./consulta";

export class Paciente {
    idPaciente: number = 0;
    nombres : string = '';
    primerApellido : string = '';
    segundoApellido : string = '';
    edad: number | null = null;
    edadCalculada : number = 0;

    fechaNacimiento: Date = new Date();

    sexo : string = '';
    celular : string = '';
    telefono : string = '';
    email : string = '';
    direccion : string = '';

    createdAt: Date = new Date();
    modifiedAt: Date = new Date();

    consultas : Consulta[] = [];
}