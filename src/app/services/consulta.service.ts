import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Page } from '../interfaces/page';

import { Consulta } from '../models/consulta';
import { Paciente } from '../models/paciente';

@Injectable({
    providedIn: 'root'
})

export class ConsultaService {

    private urlEndPointConsulta: string = `${environment.apiBaseURL}/consultas`;

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    getConsultas(pageNumber: number, pageSize: number, idConsulta: number): Observable<HttpResponse<Page<Consulta>>> {

        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('idConsulta', idConsulta);

        //return this.http.get<Page<Paciente[]>>(`${this.urlEndPointPaciente}?page=${page}&size=${size}`, { observe: 'response' });
        return this.http.get<Page<Consulta>>(`${this.urlEndPointConsulta}`, { params, observe: 'response' });
        //return this.http.get<Page<Paciente>>(`${this.urlEndPointPacienteKamabye}`, { params, observe: 'response' });
    }

    getConsultasByPaciente(idPaciente: number): Observable<HttpResponse<Page<Consulta>>> {

        return this.http.get<Page<Consulta>>(`${this.urlEndPointConsulta}/${idPaciente}`, { observe: 'response' });
    }

    getConsulta(idConsulta: number): Observable<HttpResponse<Consulta>> {
        const params = new HttpParams()
            .set('idConsulta', idConsulta);

        return this.http.get<Consulta>(`${this.urlEndPointConsulta}`, { params, observe: 'response' });
    }

    getPacienteByIdConsulta(idConsulta: number): Observable<HttpResponse<Paciente>> {
        const params = new HttpParams()
            .set('idConsulta', idConsulta);
        return this.http.get<Paciente>(`${this.urlEndPointConsulta}/getPaciente`, { params, observe: 'response' });
    }

    crearConsulta(consulta: Consulta): Observable<HttpResponse<Consulta>> {
        return this.http.post<Consulta>(this.urlEndPointConsulta, consulta, { observe: 'response' });
    }

    patchUpdateConsulta(consulta: Consulta): Observable<HttpResponse<Consulta>> {
        //return this.http.put<Paciente>(`${this.urlEndPointPaciente}/${paciente.idPaciente}`, paciente, { headers: this.httpHeaders, observe: 'response' });
        return this.http.patch<Consulta>(`${this.urlEndPointConsulta}`, consulta, { headers: this.httpHeaders, observe: 'response' });
    }

    eliminarConsulta(idConsulta: number): Observable<HttpResponse<Consulta>> {
        return this.http.delete<Consulta>(`${this.urlEndPointConsulta}/${idConsulta}`, { observe: 'response' });
    }
}