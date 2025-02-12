import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Partitura } from '../models/partitura';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PartituraService {

  private urlEndPointObra: string = `${environment.apiBaseURL}/obra`;
  private urlEndPointPartitura: string = `${environment.apiBaseURL}/partitura`;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getPartituras(idObra: number): Observable<HttpResponse<Partitura[]>> {

    const startTime = performance.now(); // Registra el tiempo de inicio

    //Cualquier petición HttpClient retorna el tipado en un Observable<HttpResponse<T>>
    return this.http.get<Partitura[]>(`${this.urlEndPointPartitura}/related/${idObra}`, { observe: 'response' })
      //pipe encadena multiples operadores tap, map, filter, reduce, mergeMap
      .pipe(
        //tap realiza una acción secundaria sin alterar los datos
        tap(
          //data => console.log(`HttpResponse: `, data)
        ),
        finalize(() => {
          const endTime = performance.now(); // Registra el tiempo de finalización
          const elapsedTime = endTime - startTime; // Calcula el tiempo transcurrido
          console.log(`Finalize() pipe getObras ObraService : Tiempo de respuesta: ${elapsedTime} ms`);
        })

      );
  }

  crearPartitura(idObra: number, partitura: Partitura): Observable<Partitura> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Partitura>(`${this.urlEndPointPartitura}/${idObra}`, partitura, { headers, observe: 'response' })
      //pipe encadena multiples operadores tap, map, filter, reduce, mergeMap para transformar los datos emitidos por Observable
      .pipe(
        //tap permite visualizar los datos emitidos por observable, actuaizar variables locales, notifcicacion, o llamada a servicio
        tap(
          data => console.info('HttpResponse', data)
        ),
        //Extrae el cuerpo del HttpResponse y lo retorna como Observable<Obra>
        map(response => response.body!),
        //Captura errores y permite transformarlo en otro Observable, reintentar la petición, mostrar un error personalizado o emitir un valor por defecto
        catchError(error => {
          console.error('Error:', error);
          return of(new Partitura()); // Emitir un array vacío en caso de error
        })
      )
      ;
  }

  uploadPartitura(idPartitura: number, formData: FormData): Observable<Partitura> {

    return this.http.patch<Partitura>(`${this.urlEndPointPartitura}/upload/${idPartitura}`, formData, { reportProgress: true, observe: 'response' })
      //pipe encadena multiples operadores tap, map, filter, reduce, mergeMap para transformar los datos emitidos por Observable
      .pipe(
        //tap permite visualizar los datos emitidos por observable, actuaizar variables locales, notifcicacion, o llamada a servicio
        tap(
          data => console.info('HttpResponse', data)
        ),
        //Extrae el cuerpo del HttpResponse y lo retorna como Observable<Obra>
        map(response => response.body!),
        //Captura errores y permite transformarlo en otro Observable, reintentar la petición, mostrar un error personalizado o emitir un valor por defecto
        catchError(error => {
          console.error('Error:', error);
          return of(new Partitura()); // Emitir un array vacío en caso de error
        })
      )
      ;
  }

  getVistaPreviaPartitura(idPartitura: number): Observable<Blob> {

    const headers = new HttpHeaders({
      'Accept': 'application/pdf' // Importante: Indica que aceptas archivos PDF
    });

    const startTime = performance.now(); // Registra el tiempo de inicio

    //Cualquier petición HttpClient retorna el tipado en un Observable<HttpResponse<T>>
    return this.http.get(`${this.urlEndPointPartitura}/view/${idPartitura}`, { headers: headers, responseType: 'blob' })
      //pipe encadena multiples operadores tap, map, filter, reduce, mergeMap
      .pipe(
        //tap realiza una acción secundaria sin alterar los datos
        tap(
          //data => console.log(`HttpResponse: `, data)
        ),
        finalize(() => {
          const endTime = performance.now(); // Registra el tiempo de finalización
          const elapsedTime = endTime - startTime; // Calcula el tiempo transcurrido
          console.log(`Finalize() pipe getVistaPreviaPartitura PartituraService : Tiempo de respuesta: ${elapsedTime} ms`);
        })

      );
  }

  blobToUrl(blob: Blob): SafeUrl {
    const urlCreator = window.URL || window.webkitURL;
    const url = urlCreator.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  eliminarPartitura(idPartitura: number): Observable<HttpResponse<Partitura>> {
      return this.http.delete<Partitura>(`${this.urlEndPointPartitura}/${idPartitura}`, { observe: 'response' });
    }

}