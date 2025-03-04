import { Obra } from "./obra";
import { Usuario } from "./usuario";

export class CartItem {

    usuario : Usuario = new Usuario();

    producto : Obra = new Obra();

    cantidad : number = 0;

    subtotal : number = 0;

    impuesto : number = 0;

    total : number = 0;
}