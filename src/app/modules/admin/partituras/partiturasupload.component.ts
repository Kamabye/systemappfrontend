import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/interfaces/page';
import { Obra } from 'src/app/models/obra';
import { Partitura } from 'src/app/models/partitura';
import { ObraService } from 'src/app/services/obra.service';
import { PartituraService } from 'src/app/services/partitura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partiturasupload',
  //standalone: true,
  //imports: [],
  templateUrl: './partiturasupload.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartiturasuploadComponent implements OnInit {

  pdfUrl: SafeUrl | null = null;
  partituraPDF!: File;
  //Este es el objeto que define la obra y a donde se cargarán los instrumentos
  obra: Obra = new Obra();
  //Este objeto servirá para guardar cada instrumento
  partitura: Partitura = new Partitura();
  // El caracter ! le dice a TypeScript que puede estar seguro que el valor no será null o undefined
  pageObras!: Page<Obra>;

  constructor(private obraService: ObraService, private partituraService: PartituraService, private router: Router, private activateRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.info("PartiturasUploadComponent ngOnInit()");
    this.cargarPartiturasObra();
  }
  cargarPartiturasObra() {
    console.info("PartiturasUploadComponent cargarPartiturasObra()");
    this.activateRoute.paramMap.subscribe(params => {

      const idObraString = params.get('idObra');

      if (idObraString) {
        const idObra = Number(idObraString);

        if (!isNaN(idObra)) {

          this.obraService.getObra(idObra).subscribe({
            next: response => {

              this.obra = response.body!;
              this.partituraService.getPartituras(this.obra.idObra).subscribe({
                next: data => {
                  this.obra.partituras = data.body!;
                  //console.info(this.obra);
                  this.cdr.detectChanges();
                },
                error: err => {
                  this.router.navigate(['/admin/obras'])
                  Swal.fire({
                    title: "¡Algo pasó!",
                    text: `Error: ${err.error.error}`,
                    icon: "error"
                  });
                  console.error("Error: ", err.error.error);

                },
                complete: () => {
                  console.info("Complete partituras upload getPartiturasObra");
                }
              });

            },
            error: err => {
              this.router.navigate(['/admin/obras'])
              Swal.fire({
                title: "¡Algo pasó!",
                text: `Error: ${err.error.error}`,
                icon: "error"
              });
              console.error("Error: ", err.error.error);
            },
            complete: () => {
              console.info("Complete partituras upload cargarObra");
            }
          });
        }
        else {
          this.router.navigate(['/admin/obra'])
          Swal.fire({
            title: "¡Algo pasó!",
            text: `Error: idObra inválido`,
            icon: "error"
          });
          console.error("Error: idObra inválido");
        }
      }
      else {
        this.router.navigate(['/admin/obra'])
        Swal.fire({
          title: "¡Algo pasó!",
          text: `Error: idObra no presente`,
          icon: "error"
        });
        console.error("Error: idObra no presente");
      }
    })
  }

  eliminarPartitura(partitura: Partitura) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro de eliminar este objeto?',
      text: `ID Objeto: ${partitura.idPartitura}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.partituraService.eliminarPartitura(partitura.idPartitura).subscribe({
          next: data => {
            this.obra.partituras = this.obra.partituras.filter(r => r != partitura);
            this.cdr.detectChanges();
            swalWithBootstrapButtons.fire({
              title: 'Eliminado!',
              text: `IDPartitura: ${data.body?.idPartitura} eliminado con éxito`,
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
            console.info("Complete eliminar Partitura");
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

  handleFileInput(event: any): void {
    this.partituraPDF = event.target.files[0];
  }

  crearInstrumento() {
    this.partituraService.crearPartitura(this.obra!.idObra, this.partitura).subscribe({
      next: data => {
        const formData = new FormData();
        formData.append('partituraPDF', this.partituraPDF);

        this.partituraService.uploadPartitura(data.idPartitura, formData).subscribe({
          next: data => {
            this.obra.partituras.push(data);
            this.cdr.detectChanges();
            Swal.fire({
              title: "¡Genial!",
              text: `¡Partitura: "${data.instrumento}" creada con éxito!`,
              icon: "success"
            });
          },
          error: err => {
            console.error("Error: ", err);
          },
          complete: () => {

          }
        });
      },
      error: err => {

      },
      complete: () => {

      }
    });
  }

  viewPartitura(idPartitura: number) {
    this.partituraService.getVistaPreviaPartitura(idPartitura).subscribe({
      next: data => {
        this.pdfUrl = this.partituraService.blobToUrl(data);
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error:', err);
      },
      complete: () => {

      }
    });
  }

}