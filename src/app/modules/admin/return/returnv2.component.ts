import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs'; // Importar Subscription para desuscribirse

import { PayPalService } from 'src/app/services/paypal.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-returnv2',
    standalone: true,
    templateUrl: './returnv2.component.html'
})

export class ReturnV2Component implements OnInit {
    orderDetailsJSON : string = "";

    constructor(private payPalService: PayPalService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        const token = this.route.snapshot.queryParamMap.get('token');
        const payerID = this.route.snapshot.queryParamMap.get('PayerID');
        const orderId = "2UA51287PR3094431";

        if (token) {
            this.payPalService.captureOrder(token).subscribe(
                {
                    next: data => {
                        console.info("Orden Capturada");
                        console.info(data.body);
                        if (data && data.body!.status === 'COMPLETED') {
                            this.payPalService.detailsOrder(token).subscribe({
                                next: data => {
                                    this.orderDetailsJSON = data.body!;
                                },
                                error: err => {
                                    console.error("Error en la captura", err)
                                }
                            });
                            //this.router.navigate(['/admin/shopcart', ]);
                            //Swal.fire('El paciente', `El pago ${data.body?.id} fue realizado con éxito!`, 'success')
                        } else {
                            alert('Error al capturar el pago.');
                            console.log(data)
                        }
                    },
                    error: err => {
                        console.error("Error en la captura", err)
                    }
                }
            );
        } else {
            console.error("No se encontro el orderId")
        }

    }
}