import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Obra } from '../models/obra';
import { Partitura } from '../models/partitura';
import { OBRAS } from '../json/obra.json';


@Injectable({
  providedIn: 'root'
})
export class ObraService {


  private urlEndPoint: string = 'http://localhost:8081/system/apiv1/obra';
  private urlEndPointPartitura: string = 'http://localhost:8081/system/apiv1/partitura';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getObras(): Observable<HttpResponse<Obra[]>> {
    //return of(ROLES);
    return this.http.get<Obra[]>(`${this.urlEndPoint}`, { observe: 'response' });
  }

  getObrasJSON(): Observable<Obra[]> {
    return of(OBRAS);
  }

  getObraJSON(idObra : number): Observable<any> {
    console.info("El id Obra es " + idObra);
    const objetoEncontrado = OBRAS.find(objeto => objeto.id == idObra);
    return of(objetoEncontrado);
  }

  getObraView(idObra: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${this.urlEndPointPartitura}/view/${idObra}`, { observe: 'response' });
  }

  getObra(idObra: number): Observable<HttpResponse<Obra>> {
    return this.http.get<Obra>(`${this.urlEndPoint}/${idObra}`, { observe: 'response' });
  }

  crearObraFormData(formData: FormData): Observable<HttpResponse<Obra>> {
    return this.http.post<Obra>(this.urlEndPoint, formData, { observe: 'response' });
  }

  actualizarObraFormData(formData: FormData, idObra : number): Observable<HttpResponse<Obra>> {
    return this.http.put<Obra>(`${this.urlEndPoint}/${idObra}`, formData, { observe: 'response' });
  }

  eliminarObra(idObra: number): Observable<HttpResponse<Obra>> {
    return this.http.delete<Obra>(`${this.urlEndPoint}/${idObra}`, { observe: 'response' });
  }

}
