import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class AuthService {

  public isAuthenticated = false;

  private urlAuth: string = 'http://localhost:8081/system/apiv1/auth';

  token: string | null = '';

  decodedToken: any;



  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  loginWithCredentials(credentials: FormData): Observable<HttpResponse<string>> {

    return this.http.post(`${this.urlAuth}`, credentials, { observe: 'response', responseType: 'text' })

  }

  isSessionActive(): boolean {
    console.info("AuthService isSessionActive()");
    if (this.getToken() != null) {
      console.info(this.getToken());
      if (this.getIsTokenValid(this.getToken())) {
        console.info("AuthService token válido");
        return true;
      }
      else{
        console.info("AuthService token no válido");
        return false;
      }
    }
    else{
      console.info("AuthService token no presente");
      return false;
    }
  }

  loguear(token: string): void {
    console.info("AuthService loguear()");
    if (this.getIsTokenValid(token)) {
      console.info("AuthService loguear Token Válido");
      this.setToken(token);
      console.info(this.getToken());
      this.decodedTokenMethod(this.getToken());
      console.info(this.decodedToken);
      this.isAuthenticated = true;
    }
    else {
      console.info("AuthService loguear Token Inválido")
      this.removeToken();
      this.isAuthenticated = false;
    }

  }

  setToken(token: string): void {
    console.info("AuthService setToken()")
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    console.info("AuthService getToken()")
    this.token = localStorage.getItem('token');
    return this.token;
  }

  removeToken(): void {
    console.info("AuthService removeToken()")
    localStorage.removeItem('token');
  }

  decodedTokenMethod(token: string | null): void {
    if (token != null) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }


  getIsTokenValid(token: string | null): boolean {

    return !this.jwtHelper.isTokenExpired(token);

  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  getRole(): string {
    return "ADMIN";
  }
}