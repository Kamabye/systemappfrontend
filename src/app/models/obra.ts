import { Partitura } from "./partitura";

export class Obra {
    id: number = 0;
    nombre : string = '';
    compositor : string = '';
    arreglista : string = '';
    letrista : string = '';
    precio: number = 0;
    genero : string = '';
    embedAudio : string = '';
    embedVideo : string = '';
    
    createdAt: Date = new Date();
    modifiedAt: Date = new Date();

    partituras : Partitura[] = [];
}