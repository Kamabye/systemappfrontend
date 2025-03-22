import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { tap, finalize } from 'rxjs/operators';

import { CartItem } from '../models/cartitem';
import { Page } from '../interfaces/page';

@Injectable({
    providedIn: 'root'
})
export class ShopCartService {
    private urlEndPointShopCart: string = `${environment.apiBaseURL}/shopcart`;

    constructor(private http: HttpClient) { }

    getAllShopCart(pageNumber: number, pageSize: number, string: string): Observable<HttpResponse<Page<CartItem>>> {

        const startTime = performance.now(); // Registra el tiempo de inicio

        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize)
            .set('string', string);

        //Cualquier petición HttpClient retorna el tipado en un Observable<HttpResponse<T>>
        return this.http.get<Page<CartItem>>(`${this.urlEndPointShopCart}`, { params, observe: 'response' })
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

    getUserShopCart(pageNumber: number, pageSize: number, string: string): Observable<HttpResponse<Page<CartItem>>> {

        const startTime = performance.now(); // Registra el tiempo de inicio

        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize)
            .set('string', string);

        //Cualquier petición HttpClient retorna el tipado en un Observable<HttpResponse<T>>
        return this.http.get<Page<CartItem>>(`${this.urlEndPointShopCart}/user`, { params, observe: 'response' })
            //pipe encadena multiples operadores tap, map, filter, reduce, mergeMap
            .pipe(
                //tap realiza una acción secundaria sin alterar los datos
                tap(
                    //data => console.log(`HttpResponse: `, data)
                ),
                finalize(() => {
                    const endTime = performance.now(); // Registra el tiempo de finalización
                    const elapsedTime = endTime - startTime; // Calcula el tiempo transcurrido
                    console.log(`Finalize() pipe getShopCart ShopCartService : Tiempo de respuesta: ${elapsedTime} ms`);
                })

            );
    }

    countCartItem(): Observable<HttpResponse<number>> {
        const startTime = performance.now(); // Registra el tiempo de inicio

        //Cualquier petición HttpClient retorna el tipado en un Observable<HttpResponse<T>>
        return this.http.get<number>(`${this.urlEndPointShopCart}/user/count`, { observe: 'response' })
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
}