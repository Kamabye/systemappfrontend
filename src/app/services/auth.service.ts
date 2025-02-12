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

  decodedToken: any;
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

            this.setToken(data.body!);
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

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Obtén el JWT del localStorage
    if (token) {
      // Aquí podrías agregar lógica para verificar la validez del token (decodificarlo, verificar la fecha de expiración, etc.)
      // Por ahora, simplemente verificamos si existe.
      return true; // Si el token existe, asumimos que está autenticado (simplificado)
    }
    return false;
  }

  getUserRoles(): string[] | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Asumiendo que 'roles' es un array en tu JWT
        return decoded.authorities || []; // Devuelve un array vacío si no hay roles
      } catch (error) {
        console.error('Token inválido', error);
        return null;
      }
    }
    return null;
  }

}