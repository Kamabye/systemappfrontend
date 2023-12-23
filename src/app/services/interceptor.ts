import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = request.url;

    console.info(url);

    if (url.includes('/apiv1/auth')) {
      console.info("LogginInterceptor url incluye /login");
      return next.handle(request);
    }
    else{
      console.info("LogginInterceptor url NO incluye /login");
      const token = localStorage.getItem('token');

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    // Continuar con la solicitud
    return next.handle(request);
  }

  private modifyRequest(request: HttpRequest<any>): HttpRequest<any> {
    // Puedes agregar modificaciones adicionales a la solicitud aquí si es necesario
    return request;
  }
}