import { ProductoDTOPalPay } from "./productoDTOPayPal";

export class PaymentPayPalDTO {

    intencion : string = '';
    metodoPago : string = '';
    email : string = '';
    divisa : string = '';
    total : string = '';
    subTotal : string = '';
    impuestoTotal : string = '';
    envio : string = '';
    descripcionPago : string = '';
    cancelUrl : string = '';
    returnUrl : string = '';

    listaProductosDTO : ProductoDTOPalPay[] = [];
}