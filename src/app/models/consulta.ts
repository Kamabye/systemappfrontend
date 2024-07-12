import { Paciente } from "./paciente";

export interface Consulta {
    idConsulta: number;

    totalDer : number;
    totalIzq : number;

    totalAstigDer : number;
    totalAstigIzq : number;

    totalAngDer : number;
    totalAngIzq : number;

    subLejDer : number;
    subLejIzq : number;

    subLejAstigDer : number;
    subLejAstigIzq : number;

    subLejAngDer : number;
    subLejAngIzq : number;

    addDer : number;
    addIzq : number;

    dip : number;

    rx : string;

    ocupacion : string;

    avizq : number;
    avder : number;

    avderSnellen : string;
    avizqSnellen : string;

    createdAt: Date;
    modifiedAt: Date;

    paciente : Paciente;
}