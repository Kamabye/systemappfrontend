import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs'; // Importar Subscription para desuscribirse

import { PayPalService } from 'src/app/services/paypal.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-return',
    templateUrl: './return.component.html'
})

export class ReturnComponent implements OnInit {
    constructor(private payPalService: PayPalService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {

        const paymentId = this.route.snapshot.queryParamMap.get('paymentId');
        const token = this.route.snapshot.queryParamMap.get('token');
        const payerID = this.route.snapshot.queryParamMap.get('PayerID');



        console.log('paymentId:', paymentId); // Imprime el valor de 'categoria' o null si no existe
        console.log('token:', token);       // Imprime el valor de 'orden' o null si no existe
        console.log('PayerID:', payerID);       // Imprime el valor de 'orden' o null si no existe

        // Acceder a todos los parámetros como un objeto:
        const todosLosParams = this.route.snapshot.queryParamMap.keys.reduce((acc: any, key) => {
            acc[key] = this.route.snapshot.queryParamMap.get(key);
            return acc;
        }, {});
        console.log("Todos los parametros:", todosLosParams)


        // Verificar si un parámetro existe:
        if (this.route.snapshot.queryParamMap.has('paymentId')) {
            console.log("El parametro paymentId existe")
        }


        this.payPalService.validarPagoPayPal(paymentId!, token!, payerID!).subscribe(
            {
                next: data => {
                    //console.info("ObrasComponent response");
                    if (data) {
                        if (data.status !== 200) {

                            Swal.fire('Mensaje: ', 'Pago tuvo un error', 'warning');
                        }
                        else {
                            this.router.navigate(['/admin/shopcart'])
                            Swal.fire('Mensaje: ', 'Pago validado con exito', 'warning');
                        }
                    }

                },
                error: err => {
                    Swal.fire('Mensaje: ', `${err.error.error}`, 'error')
                    console.error("Error al validar el pago: ", err);
                },
                complete: () => {
                    console.log('validarPago complete');
                }
            }
        );


    }
}