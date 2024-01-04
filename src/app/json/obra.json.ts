import { Obra } from "../models/obra";
import { PARTITURAS } from "./partituras.json";

export const OBRAS: Obra[] = [
    {
        id: 1,
        nombre: 'Admin',
        compositor : 'Compositor',
        arreglista : 'arreglista',
        letrista : 'letristas',
        genero : 'genero',
        precio : 100,
        embedAudio : '<frame></frame>',
        embedVideo : '<frame></frame>',
        createdAt: new Date(),
        modifiedAt: new Date(),
        partituras : PARTITURAS,
    },
]