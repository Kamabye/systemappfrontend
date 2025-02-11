import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { tap, finalize, map, filter, catchError } from 'rxjs/operators';

import { Obra } from '../models/obra';
import { Partitura } from '../models/partitura';
import { OBRAS } from '../json/obra.json';

import { environment } from 'src/environments/environment';
import { Page } from '../interfaces/page';


@Injectable({
  providedIn: 'root'
})
export class ObraService {

  private urlEndPointObra: string = `${environment.apiBaseURL}/obra`;
  private urlEndPointPartitura: string = `${environment.apiBaseURL}/partitura`;


  constructor(private http: HttpClient) { }

  getObras(pageNumber: number, pageSize: number, string: string): Observable<HttpResponse<Page<Obra>>> {

    const startTime = performance.now(); // Registra el tiempo de inicio

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('string', string);

    //Cualquier petición HttpClient retorna el tipado en un Observable<HttpResponse<T>>
    return this.http.get<Page<Obra>>(`${this.urlEndPointObra}`, { params, observe: 'response' })
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

  getObra(idObra: number): Observable<HttpResponse<Obra>> {
    return this.http.get<Obra>(`${this.urlEndPointObra}/${idObra}`, { observe: 'response' });
  }

  crearObraFormData(formData: FormData): Observable<HttpResponse<Obra>> {
    return this.http.post<Obra>(this.urlEndPointObra, formData, { observe: 'response' });
  }

  crearObra(obra: Obra): Observable<Obra> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Obra>(`${this.urlEndPointObra}`, obra, { headers, observe: 'response' })
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
          return of(new Obra()); // Emitir un array vacío en caso de error
        })
      )
      ;
  }

  uploadAudio(formData: FormData, idObra: number): Observable<Obra> {
    return this.http.patch<Obra>(`${this.urlEndPointObra}/upload/${idObra}`, formData, { reportProgress: true, observe: 'response' })
      //pipe encadena multiples operadores tap, map, filter, reduce, mergeMap para transformar los datos emitidos por Observable
      .pipe(
        //tap permite visualizar los datos emitidos por observable, actuaizar variables locales, notifcicacion, o llamada a servicio
        tap(
          data => console.log('ObraService uploadAudio() Respuesta HTTP:', data)
        ),
        //Extrae el cuerpo del HttpResponse y lo retorna como Observable<Obra>
        map(response => response.body!),
        //Captura errores y permite transformarlo en otro Observable, reintentar la petición, mostrar un error personalizado o emitir un valor por defecto
        catchError(error => {
          console.error('ChatErrorObservable<Obra>: ', error);
          return of(new Obra()); // Emitir un array vacío en caso de error
        })
      )
      ;
  }

  actualizarObra(obra: Obra): Observable<Obra> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.patch<Obra>(`${this.urlEndPointObra}`, obra, { headers, observe: 'response' })
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
          return of(new Obra()); // Emitir un array vacío en caso de error
        })
      )
      ;
  }

  comprarObra(obra: Obra): Observable<HttpResponse<Obra>> {
    return this.http.post<Obra>(this.urlEndPointObra, obra, { observe: 'response' });
  }

  actualizarObraFormData(formData: FormData, idObra: number): Observable<HttpResponse<Obra>> {
    return this.http.put<Obra>(`${this.urlEndPointObra}/${idObra}`, formData, { observe: 'response' });
  }

  eliminarObra(idObra: number): Observable<HttpResponse<Obra>> {
    return this.http.delete<Obra>(`${this.urlEndPointObra}/${idObra}`, { observe: 'response' });
  }

  getObraView(idObra: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${this.urlEndPointPartitura}/view/${idObra}`, { observe: 'response' });
  }

  getObrasJSON(): Observable<Obra[]> {
    return of(OBRAS);
  }

  getObraJSON(idObra: number): Observable<any> {
    console.info("El id Obra es " + idObra);
    const objetoEncontrado = OBRAS.find(objeto => objeto.idObra == idObra);
    return of(objetoEncontrado);
  }



  getAudioObra(idObra: number): Observable<Blob> {
    return this.http.get(`${this.urlEndPointObra}/play/${idObra}`, { responseType: 'blob' });
  }
}