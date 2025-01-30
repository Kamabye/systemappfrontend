import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { DomSanitizer } from '@angular/platform-browser';

import { FormControl } from '@angular/forms';

import { Page } from 'src/app/interfaces/page';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PayPalService } from 'src/app/services/paypal.service';
import { PaymentPayPalDTO } from 'src/app/models/paymentPayPalDTO';
import { ProductoDTOPalPay } from 'src/app/models/productoDTOPayPal';

import { OrderRequestPayPalV2 } from 'src/app/models/orderrequestpaypalv2';
import { AmountPayPalV2 } from 'src/app/models/amountpaypalv2';
import { PurchaseUnitPayPalV2 } from 'src/app/models/purchaseunitpaypalv2';

@Component({
    selector: 'app-shopcart',
    standalone: true,
    templateUrl: './shopcart.component.html'
})
export class ShopCartComponent implements OnInit {

    paymentPayPalDTO: PaymentPayPalDTO = new PaymentPayPalDTO();
    listaProductosDTO: ProductoDTOPalPay[] = [];
    productoDTOPalPay1: ProductoDTOPalPay = new ProductoDTOPalPay();
    productoDTOPalPay2: ProductoDTOPalPay = new ProductoDTOPalPay();

    purchaseUnits: PurchaseUnitPayPalV2 = new PurchaseUnitPayPalV2();
    amount: AmountPayPalV2 = new AmountPayPalV2();
    orderRequestPayPalV2: OrderRequestPayPalV2 = new OrderRequestPayPalV2();



    constructor(private payPalService: PayPalService, private router: Router, private activateRoute: ActivatedRoute) { }

    ngOnInit(): void {
        console.info("ShopCartComponent ngOnInit");



    }

    pagar() {


        this.paymentPayPalDTO.intencion = 'sale';
        this.paymentPayPalDTO.metodoPago = 'paypal';
        this.paymentPayPalDTO.email = 'juancarloshdzvqz@hotmail.com';
        this.paymentPayPalDTO.divisa = 'MXN';
        this.paymentPayPalDTO.total = '2420.00';
        this.paymentPayPalDTO.subTotal = '2000.00';
        this.paymentPayPalDTO.impuestoTotal = '320.00';
        this.paymentPayPalDTO.envio = '100.00';
        this.paymentPayPalDTO.descripcionPago = 'Pago de una Obra';
        this.paymentPayPalDTO.cancelUrl = 'http://localhost:4200/admin/cancel';
        this.paymentPayPalDTO.returnUrl = 'http://localhost:4200/admin/return';

        this.productoDTOPalPay1.nombre = 'Producto_1';
        this.productoDTOPalPay1.sku = 'SKU_1';
        this.productoDTOPalPay1.descripcion = 'Descripcion_Producto_1';
        this.productoDTOPalPay1.categoria = 'DIGITAL';
        this.productoDTOPalPay1.precio = '100.00';
        this.productoDTOPalPay1.impuesto = '16.00';
        this.productoDTOPalPay1.cantidad = '10';

        this.productoDTOPalPay2.nombre = 'Producto_2';
        this.productoDTOPalPay2.sku = 'SKU_2';
        this.productoDTOPalPay2.descripcion = 'Descripcion_Producto_2';
        this.productoDTOPalPay2.categoria = 'DIGITAL';
        this.productoDTOPalPay2.precio = '100.00';
        this.productoDTOPalPay2.impuesto = '16.00';
        this.productoDTOPalPay2.cantidad = '10';

        this.listaProductosDTO.push(this.productoDTOPalPay1);
        this.listaProductosDTO.push(this.productoDTOPalPay2);

        this.paymentPayPalDTO.listaProductosDTO = this.listaProductosDTO;

        this.payPalService.pagarPayPal(this.paymentPayPalDTO).subscribe(
            {
                next: data => {
                    if (data.body !== null) {
                        //this.router.navigate([data.body])
                        window.location.href = data.body;
                        //Swal.fire('Mensaje', `Obra: ${data.body.nombre} creado con éxito!`, 'success')
                    } else {
                        console.error('El cuerpo de la respuesta es nulo.');
                    }

                }
                ,
                error: err => {
                    this.router.navigate(['/admin/shopcart'])
                    Swal.fire('Mensaje', `${err.error.error}`, 'warning')
                    console.error("Error al pagarpaypyal: ", err);
                }
            }
        );
    }

    pagarV2() {

        console.info("ShopCartComponent pagarV2");

        this.amount.value = "230.00";

        this.purchaseUnits.amount = this.amount;

        this.purchaseUnits.amount.breakdown.item_total.value = "230.00";

        this.orderRequestPayPalV2.purchase_units.push(this.purchaseUnits);

        console.info(this.orderRequestPayPalV2);

        this.payPalService.createOrderRequest(this.orderRequestPayPalV2).subscribe(
            {
                next: data => {
                    console.info("Se ha creado la orden paypal");
                    console.info(data.body);
                    if (data) {
                        const payeraction = data.body!.links.find(link => link.rel === 'payer-action');
                        if (payeraction) {
                            window.location.href = payeraction.href;
                        } else {
                            console.error("No se encontró el link de aprobación");
                        }
                    }
                    else {
                        console.error("Respuesta nulla");
                    }


                }
                ,
                error: err => {
                    this.router.navigate(['/admin/shopcart'])
                    Swal.fire('Mensaje', `${err.error.error}`, 'warning')
                    console.error("Error al crear la orden: ", err);
                }
            }
        );
        this.orderRequestPayPalV2 = new OrderRequestPayPalV2();
    }

}