import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard{
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        console.info("AuthGuard canActivate: ");
        console.info(this.authService.getToken());
        console.info(this.authService.isAuthenticated);
        if (this.authService.isSessionActive()) {
            // Comprueba el rol del usuario y redirecciona en consecuencia
            const userRole = this.authService.getRole();

            console.info("AuthGuard userRol: " + userRole);

            switch (userRole) {
                
                case 'ADMIN':
                    console.info(userRole);
                    console.info("AuthGuard  se va a direccionar a admin");
                    return true;
                case 'ACCOUNT':
                    console.info("AuthGuard  se va a direccionar a account");
                    return true;
                default:
                    console.info("AuthGuard  se va a direccionar a home");
                    this.router.navigate(['/home']);
                    return false;
            }
            console.info("AuthGuard se va a retornar false: ");
            return false;
        }
        console.info("AuthGuard sin sesion: ");
        return true;
    }
}