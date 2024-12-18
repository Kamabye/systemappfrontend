import { Paciente } from "./paciente";

export class Consulta {
    idConsulta: number = 0;

    totalDer : number = 0.0;
    totalIzq : number = 0.0;

    totalAstigDer : number = 0.0;
    totalAstigIzq : number = 0.0;

    totalAngDer : number = 0.0;
    totalAngIzq : number = 0.0;

    subLejDer : number = 0.0;
    subLejIzq : number = 0.0;

    subLejAstigDer : number = 0.0;
    subLejAstigIzq : number = 0.0;

    subLejAngDer : number = 0.0;
    subLejAngIzq : number = 0.0;

    addDer : number = 0.0;
    addIzq : number = 0.0;

    dip : number = 0.0;

    rx : string = "";

    ocupacion : string = "";

    avizq : number = 0.0;
    avder : number = 0.0;

    avderSnellen : string = "";
    avizqSnellen : string = "";

    fechaCreacion: Date = new Date();
    fechaModificacion: Date = new Date();

    createdAt: Date = new Date();
    modifiedAt: Date = new Date();

    paciente : Paciente = new Paciente();
}