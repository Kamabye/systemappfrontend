import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';

import { Page } from '../interfaces/page';

import { Paciente } from '../models/paciente';

@Injectable({
    providedIn: 'root'
})
export class PacienteService {

    private urlEndPointPaciente: string = 'http://localhost:8081/system/apiv1/optica/paciente';
    private urlEndPointConsulta: string = 'http://localhost:8081/system/apiv1/optica/consulta';

    //private urlEndPointPaciente: string = 'https://kamabye.herokuapp.com/apiv1/optica/paciente';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    getPacientesByString(pageNumber: number, pageSize: number, string: string): Observable<HttpResponse<Page<Paciente>>> {

        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('string', string);

        //return this.http.get<Page<Paciente[]>>(`${this.urlEndPointPaciente}?page=${page}&size=${size}`, { observe: 'response' });
        return this.http.get<Page<Paciente>>(`${this.urlEndPointPaciente}`, { params, observe: 'response' });
        //return this.http.get<Page<Paciente>>(`${this.urlEndPointPacienteKamabye}`, { params, observe: 'response' });
    }

    getPaciente(idPaciente: number): Observable<HttpResponse<Paciente>> {
        return this.http.get<Paciente>(`${this.urlEndPointPaciente}/${idPaciente}`, { observe: 'response' });
    }

    crearPaciente(paciente: Paciente): Observable<HttpResponse<Paciente>> {
        return this.http.post<Paciente>(this.urlEndPointPaciente, paciente, { observe: 'response' });
    }

    putUpdatePaciente(paciente: Paciente): Observable<HttpResponse<Paciente>> {
        //return this.http.put<Paciente>(`${this.urlEndPointPaciente}/${paciente.idPaciente}`, paciente, { headers: this.httpHeaders, observe: 'response' });
        return this.http.put<Paciente>(`${this.urlEndPointPaciente}`, paciente, { headers: this.httpHeaders, observe: 'response' });
    }

    patchUpdatePaciente(paciente: Paciente): Observable<HttpResponse<Paciente>> {
        //return this.http.put<Paciente>(`${this.urlEndPointPaciente}/${paciente.idPaciente}`, paciente, { headers: this.httpHeaders, observe: 'response' });
        return this.http.patch<Paciente>(`${this.urlEndPointPaciente}`, paciente, { headers: this.httpHeaders, observe: 'response' });
    }

    eliminarPaciente(idPaciente: number): Observable<HttpResponse<Paciente>> {
        return this.http.delete<Paciente>(`${this.urlEndPointPaciente}/${idPaciente}`, { observe: 'response' });
    }
}