import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { tap, finalize } from 'rxjs/operators';

import { Obra } from '../models/obra';
import { Partitura } from '../models/partitura';
import { OBRAS } from '../json/obra.json';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ObraService {
  
  private urlEndPointObra: string = `${environment.apiBaseURL}/obra`;
  private urlEndPointPartitura: string = `${environment.apiBaseURL}/partitura`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getObras(pageNumber: number, pageSize: number, string: string): Observable<HttpResponse<Obra[]>> {
    //return of(ROLES);
    const startTime = performance.now(); // Registra el tiempo de inicio

    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('string', string);

    return this.http.get<Obra[]>(`${this.urlEndPointObra}`, { params, observe: 'response' })
      .pipe(
        tap({
          next: data => {
            console.log(`next pipe tap getObras ObraService`)
          }, // No es necesario hacer nada con la respuesta en el tap
          error: err => { console.error('Error pipe tap getObras ObraService:', err) }, // Manejo de errores
          complete: () => { console.log(`Complete pipe.tap getObras ObraService`) }
        }
        ),
        finalize(() => {
          const endTime = performance.now(); // Registra el tiempo de finalización
          const elapsedTime = endTime - startTime; // Calcula el tiempo transcurrido
          console.log(`Finalize() pipe getObras ObraService : Tiempo de respuesta: ${elapsedTime} ms`);
        })

      );
  }

  getObrasbyNombre(pageNumber: number, pageSize: number, string: string): Observable<HttpResponse<Obra[]>> {
    //return of(ROLES);
    return this.http.get<Obra[]>(`${this.urlEndPointObra}`, { observe: 'response' });
  }

  getObra(idObra: number): Observable<HttpResponse<Obra>> {
    return this.http.get<Obra>(`${this.urlEndPointObra}/${idObra}`, { observe: 'response' });
  }

  crearObraFormData(formData: FormData): Observable<HttpResponse<Obra>> {
    return this.http.post<Obra>(this.urlEndPointObra, formData, { observe: 'response' });
  }

  crearObra(obra: Obra): Observable<HttpResponse<Obra>> {
    return this.http.post<Obra>(this.urlEndPointObra, obra, { observe: 'response' });
  }

  comprarObra(obra: Obra) : Observable<HttpResponse<Obra>> {
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

  uploadAudio(formData: FormData, idObra: number): Observable<HttpResponse<Obra>> {
    return this.http.patch<Obra>(`${this.urlEndPointObra}/upload/${idObra}`, formData, { reportProgress: true, observe: 'response' });
  }
}
