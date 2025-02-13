import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { map, tap, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private urlAuth: string = `${environment.apiBaseURL}/auth`;
  isLoggedInGuard: boolean = true;

  constructor(private http: HttpClient) { }

  loginWithCredentials(credentials: URLSearchParams): Observable<HttpResponse<string>> {

    const startTime = performance.now(); // Registra el tiempo de inicio

    const httpHeadersEncode = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    console.info(credentials.toString);

    return this.http.post(`${this.urlAuth}`, credentials, { headers: httpHeadersEncode, observe: 'response', responseType: 'text' })
      .pipe(
        tap({
          next: data => {

            if (data.body !== null && data.body.length > 0) {
              this.setToken(data.body);
            }

            //console.info(this.getToken.toString);
            //const decoded: any = jwtDecode(data.body!);
            //console.log(decoded); // Muestra el rol del usuario
            //const authorities = decoded.authorities; // Asumiendo que 'role' es la clave en tu JWT
            //console.log(authorities); // Muestra el rol del usuario
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

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {

    const token = localStorage.getItem('token');
    if (token !== null && token.length > 0) {
      return token;
    }
    return null;

  }

  logout(): void {
    this.removeToken();
  }

  private removeToken(): void {
    localStorage.removeItem('token');

  }


  /**
   * 
   * @returns Este método solo valida si hay un token válido para determinar si esta authenticado
   */
  isAuthenticated(): boolean {

    if (this.getToken() !== null && this.getToken()!.length > 0) {
      const decoded: any = jwtDecode(this.getToken()!);
      const expirationDate = new Date(decoded.exp * 1000);
      const now = new Date();

      //Evalua que no haya expirado el token
      if (decoded && expirationDate > now) {
        return true;
      }
      return false;
    }
    return false;
  }

  getUserRolesToken(): string[] {
    const token = this.getToken();
    const decoded: any = jwtDecode(token!);
    return decoded.authorities;
  }

}