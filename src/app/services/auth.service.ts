import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

import { map, tap, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private urlAuth: string = `${environment.apiBaseURL}/auth`;

  decodedToken: any;

  constructor(private http: HttpClient) { }

  loginWithCredentials(credentials: FormData): Observable<HttpResponse<string>> {

    const startTime = performance.now(); // Registra el tiempo de inicio

    return this.http.post(`${this.urlAuth}`, credentials, { observe: 'response', responseType: 'text' })
      .pipe(

        tap({
          next: data => {
            this.setToken(data.body!);
            console.log(`next pipe tap loginWithCredentials AuthService`)
          }, // No es necesario hacer nada con la respuesta en el tap
          error: err => { console.error('Error pipe tap loginWithCredentials AuthService:', err) }, // Manejo de errores
          complete: () => { console.log(`Complete pipe.tap loginWithCredentials AuthService`) }
        }
        ),
        finalize(() => {
          const endTime = performance.now(); // Registra el tiempo de finalización
          const elapsedTime = endTime - startTime; // Calcula el tiempo transcurrido
          console.log(`Finalize() pipe loginWithCredentials AuthService : Tiempo de respuesta: ${elapsedTime} ms`);
        })
      );

  }

  private setToken(response: string) {
    console.info("AuthService setToken()")
    localStorage.setItem('token', response);
  }

  getToken(): string | null {
    console.info("AuthService getToken()")
    return localStorage.getItem('token');
  }

  logout(): void {
    this.removeToken();
  }

  removeToken(): void {
    console.info("AuthService removeToken()")
    localStorage.removeItem('access_token');
  }
  
}