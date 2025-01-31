import { Component, OnInit, ViewChildren } from '@angular/core';

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
  //standalone: true,
  templateUrl: './obras.component.html'
})
export class ObrasComponent implements OnInit {

  @ViewChildren('audioPlayer') audioPlayerRefs: any;
  audioUrls: any[] = [];
  audios: HTMLAudioElement[] = [];
  isPlaying: boolean[] = [false, false, false]; // Array para trackear el estado de cada reproductor


  currentPage = 0;
  pageSize = 10;
  
  item: ItemPayPalV2 = new ItemPayPalV2();
  purchaseUnits: PurchaseUnitPayPalV2 = new PurchaseUnitPayPalV2();
  amount: AmountPayPalV2 = new AmountPayPalV2();
  orderRequestPayPalV2: OrderRequestPayPalV2 = new OrderRequestPayPalV2();

  public obras: Obra[] = [];
  page: Page<Obra> | undefined;

  nameObraInput = new FormControl();

  constructor(private obraService: ObraService, private payPalService: PayPalService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.info("ObrasComponent ngOnInit");
    //this.cargarObras();
    this.nameObraInput.setValue('');

    this.nameObraInput
      .valueChanges
      .pipe(
        debounceTime(1000), // Espera 1000ms después de que el usuario deje de escribir
        distinctUntilChanged(), // Evita emitir si el valor es el mismo que el anterior
        switchMap(searchValue => {
          console.info('Se va hacer una búsqueda SearchForm');
          return this.obraService.getObras(this.currentPage, this.pageSize, searchValue);
        }
        )
      )
      .subscribe({
        next: data => {
          console.info('Se ha buscado una obra por medio de un valor SearchForm');
          this.page = data.body!;
          this.obras = this.page.content ?? [];
          this.currentPage = 0;
        },
        error: err => {

          Swal.fire({
            title: "¡Algo pasó!",
            text: `Error: ${err.error.error}`,
            icon: "error"
          });
          console.error("Error: ", err.error.error);

        },
        complete: () => {
          console.info("Complete nameObraInput");
        }
      }
      )
      ;

    this.cargarObras();
  }

  cargarObras() {
    this.obraService.getObras(this.currentPage, this.pageSize, "").subscribe({
      next: (data) => {
        if (data) {
          if (data.status === 204) {
            Swal.fire('Mensaje: ', 'No hay datos para mostrar', 'warning');
          }
          else {
            this.page = data.body!;
            this.obras = this.page.content!;
          }
        }

      },
      error: (err) => {
        Swal.fire({
          title: "¡Algo pasó!",
          text: `Error: ${err.error.error}`,
          icon: "error"
        });
        console.error("Error: ", err.error.error);
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
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro de eliminar este objeto?',
      text: `ID Objeto: ${obra.idObra}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.obraService.eliminarObra(obra.idObra).subscribe({
          next: data => {
            this.obras = this.obras.filter(r => r != obra);
            swalWithBootstrapButtons.fire({
              title: 'Eliminado!',
              text: `IDObra: ${data.body?.idObra} eliminado con éxito`,
              icon: 'success'
            }
            );
          },
          error: err => {
            Swal.fire({
              title: "¡Algo pasó!",
              text: `Error: ${err.error.error}`,
              icon: "error"
            });
            console.error("Error: ", err.error.error);
          },
          complete() {
            console.info("Complete eliminar Obra");
          },
        });

      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
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

  onInputChange() {
    throw new Error('Method not implemented.');
  }

  playAudio(idObra: number, playerIndex: number) {
    this.obraService.getAudioObra(idObra).subscribe(blob => {
      this.audioUrls[playerIndex] = URL.createObjectURL(blob); // Crea una URL para el Blob

      this.audios[playerIndex] = this.audioPlayerRefs.toArray()[playerIndex].nativeElement; // Obtén la referencia al elemento <audio>
      this.audios[playerIndex].src = this.audioUrls[playerIndex]; // Asigna la URL al elemento <audio>

      this.audios[playerIndex].load(); // Carga el audio
      this.audios[playerIndex].play(); // Reproduce el audio
      this.isPlaying[playerIndex] = true;
    });
  }

  pauseAudio(playerIndex: number) {
    if (this.audios[playerIndex]) {
      this.audios[playerIndex].pause();
      this.isPlaying[playerIndex] = false;
    }
  }

}