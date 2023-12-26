import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  statusAuthInterceptor: boolean = false;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    console.info("AuthInterceptor intercept()");

    if (this.statusAuthInterceptor) {
      console.info("AuthInterceptor habilitado");
      const url = request.url;

      if (url.includes('/apiv1/auth')) {
        console.info("AuthInterceptor url contiene /apiv1/auth");
        return next.handle(request);
      }

      const token = localStorage.getItem('token');

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

    }
    console.info("AuthInterceptor sin acciones");
    return next.handle(request);
  }
}