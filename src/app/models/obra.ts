import { Partitura } from "./partitura";

export class Obra {
    idObra: number = 0;
    nombre : string = '';
    compositor : string = '';
    arreglista : string = '';
    letrista : string = '';
    genero : string = '';
    precio: number = 0;

    embedAudio : string = '';
    embedVideo : string = '';
    
    createdAt: Date = new Date();
    modifiedAt: Date = new Date();

    partituras : Partitura[] = [];
}