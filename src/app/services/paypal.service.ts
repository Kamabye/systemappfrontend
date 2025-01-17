import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { PaymentPayPalDTO } from "../models/paymentPayPalDTO";
import { Observable } from "rxjs";
import { OrderRequestPayPalV2 } from "../models/orderrequestpaypalv2";



interface OrderResponse {
    id: string;
    status : string;
    links: { href: string, rel: string, method: string }[];
}

interface CaptureResponse {
    status: string;
    id: string;
}


@Injectable({
    providedIn: 'root'
})

export class PayPalService {

    private urlEndPointPayPal: string = `${environment.apiBaseURL}/paypal`;

    constructor(private http: HttpClient) { }

    pagarPayPal(paymentPayPalDTO: PaymentPayPalDTO): Observable<HttpResponse<string>> {

        return this.http.post(`${this.urlEndPointPayPal}/payment`, paymentPayPalDTO, { observe: 'response', responseType: 'text' });
    }

    validarPagoPayPal(paymentId: string, token: string, payerID: string): Observable<HttpResponse<string>> {
        const params = new HttpParams()
            .set('paymentId', paymentId)
            .set('token', token)
            .set('PayerID', payerID);
        return this.http.get(`${this.urlEndPointPayPal}/success`, { params, observe: 'response', responseType: 'text' });
    }

    getToken() {
        return '';
    }

    createOrder(amount: number, currency: string, urlSuccess : string): Observable<HttpResponse<OrderResponse>> {
        const params = new HttpParams()
            .set('amount', amount)
            .set('currency', currency)
            .set('return_url', urlSuccess);
        return this.http.post<OrderResponse>(`${this.urlEndPointPayPal}/create-order`, null, { observe: 'response', params : params });
    }

    createOrderRequest(orderRequestPayPalV2 : OrderRequestPayPalV2): Observable<HttpResponse<OrderResponse>> {
        return this.http.post<OrderResponse>(`${this.urlEndPointPayPal}/create-order`, orderRequestPayPalV2, { observe: 'response' });
    }

    captureOrder(orderId: string): Observable<HttpResponse<CaptureResponse>> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const params = new HttpParams()
            .set('orderId', orderId);
        return this.http.post<CaptureResponse>(`${this.urlEndPointPayPal}/capture-order`, params, { observe: 'response' });
    }

    detailsOrder(orderId: string): Observable<HttpResponse<string>> {
        const params = new HttpParams()
            .set('orderId', orderId);
        return this.http.get(`${this.urlEndPointPayPal}/details-order`, { params, observe: 'response', responseType: 'text' });
    }

}