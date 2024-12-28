import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Page } from '../interfaces/page';

import { Paciente } from '../models/paciente';

import { tap, finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PacienteService {

    isProduction = environment.production;

    private urlEndPointPaciente: string = `${environment.apiBaseURL}/pacientes`;

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    getPacientesByString(pageNumber: number, pageSize: number, string: string): Observable<HttpResponse<Page<Paciente>>> {

        const startTime = performance.now(); // Registra el tiempo de inicio

        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('string', string);

        //return this.http.get<Page<Paciente[]>>(`${this.urlEndPointPaciente}?page=${page}&size=${size}`, { observe: 'response' });
        return this.http.get<Page<Paciente>>(`${this.urlEndPointPaciente}`, { params, observe: 'response' })
            .pipe(
                tap({
                    next: data => {
                        console.log(`next pipe tap getPacientesByString PacienteService`)
                    }, // No es necesario hacer nada con la respuesta en el tap
                    error: err => { console.error('Error pipe tap getPacientesByString PacienteService:', err) }, // Manejo de errores
                    complete: () => { console.log(`Complete pipe.tap getPacientesByString PacienteService`) }
                }
                ),
                finalize(() => {
                    const endTime = performance.now(); // Registra el tiempo de finalización
                    const elapsedTime = endTime - startTime; // Calcula el tiempo transcurrido
                    console.log(`Finalize() pipe getPacientesByString PacienteService : Tiempo de respuesta: ${elapsedTime} ms`);
                })

            );
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