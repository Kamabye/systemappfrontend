import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Imprimir la información de la solicitud antes de ejecutarla
    console.log('Solicitud antes de ejecutarla:', req);

    // Continuar con la solicitud
    return next.handle(req);
  }
}