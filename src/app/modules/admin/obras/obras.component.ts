import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

import { Page } from 'src/app/interfaces/page';

import { PayPalService } from 'src/app/services/paypal.service';
import { Obra } from 'src/app/models/obra';

import { ObraService } from 'src/app/services/obra.service';

import { OrderRequestPayPalV2 } from 'src/app/models/orderrequestpaypalv2';
import { AmountPayPalV2 } from 'src/app/models/amountpaypalv2';
import { PurchaseUnitPayPalV2 } from 'src/app/models/purchaseunitpaypalv2';
import { ItemPayPalV2 } from 'src/app/models/itempaypalv2';


@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html'
})
export class ObrasComponent implements OnInit {
  item: ItemPayPalV2 = new ItemPayPalV2();
  purchaseUnits: PurchaseUnitPayPalV2 = new PurchaseUnitPayPalV2();
  amount: AmountPayPalV2 = new AmountPayPalV2();
  orderRequestPayPalV2: OrderRequestPayPalV2 = new OrderRequestPayPalV2();

  public obras: Obra[] = [];
  page: Page<Obra> | undefined;

  public domSanitizer: DomSanitizer;

  currentPage = 0;
  pageSize = 10;
  searchControl = new FormControl();

  constructor(private obraService: ObraService, private domSanitizer1: DomSanitizer, private payPalService: PayPalService, private router: Router, private activateRoute: ActivatedRoute) {
    this.domSanitizer = domSanitizer1;
  }
  ngOnInit(): void {
    console.info("ObrasComponent ngOnInit");
    //this.cargarObras();
    this.searchControl.setValue('');

    this.searchControl.valueChanges.pipe(
      debounceTime(1000), // Espera 1000ms después de que el usuario deje de escribir
      distinctUntilChanged() // Evita emitir si el valor es el mismo que el anterior
    ).subscribe(searchString => {
      this.obras = [];
      this.currentPage = 0;
      this.fetchObras(searchString);

    })
      ;

    this.cargarObras();


  }

  fetchObras(searchString: string) {

    this.obraService.getObrasbyNombre(this.currentPage, this.pageSize, searchString).pipe(
      switchMap((response: any) => {
        //this.page = response.body;
        //this.obras = this.page?.content ?? [];
        this.obras = response.body;
        console.log("ObrasComponent fetchPacientes");
        return of(response); // Emitir la respuesta para que la suscripción la reciba
      })
    ).subscribe();
  }

  cargarObras() {
    this.obraService.getObras(this.currentPage, this.pageSize, "").subscribe({
      next: data => {
        //console.info("ObrasComponent response");
        if (data) {
          if (data.status === 204) {
            Swal.fire('Mensaje: ', 'No hay datos para mostrar', 'warning');
          }
          else {
            this.obras = data.body!;
          }
        }

      },
      error: err => {
        Swal.fire('Mensaje: ', `${err.error.error}`, 'error')
        console.error("Error al obtener las obras: ", err);
      },
      complete: () => {
        console.log('loadObras complete');
      }
    }
    );
  }

  eliminarObra(obra: Obra) {


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar el objeto ${obra.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminiar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.obraService.eliminarObra(obra.idObra).subscribe(response => {

          this.obras = this.obras.filter(r => r != obra)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Obra ${response.body?.nombre} eliminado con éxito`,
            'success'
          )
        })

      }
    })
  }




  cargarObrasJSON() {
    this.obraService.getObrasJSON().subscribe(
      (response) => {
        console.info("ObrasComponent response");
        if (response != null) {
          this.obras = response;
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      (error) => {
        Swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener las obras: ", error);
      }
    );
  }

  agregarObraShopCart() {
    throw new Error('Method not implemented.');
  }
  comprarObra(obra: Obra) {
    console.info("Se va a comprar una obra");

    this.amount.value = obra.precio.toString();

    this.purchaseUnits.amount = this.amount;
    
    this.purchaseUnits.amount.breakdown.item_total.value = obra.precio.toString();

    this.item.name = obra.nombre;

    this.item.unit_amount.value = obra.precio.toString();

    this.purchaseUnits.items.push(this.item);

    this.orderRequestPayPalV2.purchase_units.push(this.purchaseUnits);

    console.info(this.orderRequestPayPalV2);

    this.payPalService.createOrderRequest(this.orderRequestPayPalV2).subscribe({
      next: data => {
        console.info("Se ha creado la orden paypal");
        //console.info(data.body);
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
        this.router.navigate(['/admin/obra'])
        Swal.fire('Mensaje', `${err.error.error}`, 'warning')
        console.error("Error al crear la orden: ", err);
      }
    });

    this.orderRequestPayPalV2 = new OrderRequestPayPalV2();
  }

  onPageChange(page: number): void {
    console.log('PacienteComponent onPageChange');
    this.currentPage = page;
    this.cargarObras();
  }

}