import { Paciente } from "./paciente";

export class Consulta {
    idConsulta: number = 0;

    totalDer: number = 0.00;
    totalIzq: number = 0.00;

    totalAstigDer: number = 0.00;
    totalAstigIzq: number = 0.00;

    totalAngDer: number = 0.00;
    totalAngIzq: number = 0.00;

    subLejDer: number = 0.00;
    subLejIzq: number = 0.00;

    subLejAstigDer: number = 0.00;
    subLejAstigIzq: number = 0.00;

    subLejAngDer: number = 0.00;
    subLejAngIzq: number = 0.00;

    addDer: number = 0.00;
    addIzq: number = 0.00;

    dip: number = 0.00;

    rx: string = "";

    avizq: number = 8;
    avder: number = 8;

    avderSnellen: string = "20/20";
    avizqSnellen: string = "20/20";

    fechaCreacion: Date = new Date();
    fechaModificacion: Date = new Date();

    createdAt: Date = new Date();
    modifiedAt: Date = new Date();

    paciente : Paciente = new Paciente();
}