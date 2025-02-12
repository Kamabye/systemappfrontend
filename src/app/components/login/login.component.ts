import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms'; // Importa FormsModule
import { jwtDecode } from 'jwt-decode';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule], // Añade FormsModule a los imports
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    credentials = { username: '', password: '' };

    error: string | null = null;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        console.info("Ingresamos a ngOnInit login");
    }

    login(form: NgForm): void {
        console.info("Ingresamos a login");
        //console.info(this.credentials);

        if (form.valid) { // Verifica si el formulario es válido
            const body = new URLSearchParams();
            body.set('username', form.value.username);
            body.set('password', form.value.password);

            this.authService.loginWithCredentials(body).subscribe({
                next: data => {
                    if (data.body != null) {
                        console.info("JWT Authenticado");
                        const decoded: any = jwtDecode(data.body!);
                        const authorities : string[]  = decoded.authorities;

                        console.log(authorities);
                        if (authorities.includes('ROLE_Administrador')) {
                            this.router.navigate(['/admin']);
                        } else if (authorities.includes('ROLE_Editor')) {
                            this.router.navigate(['/user']);
                        }
                        else {
                            this.router.navigate(['/home']);
                        }
                    }
                },
                error: err => {
                    // Manejar errores de autenticación
                    console.error('Error al iniciar sesión', err);
                },
                complete: () => {
                    console.log('login complete');
                }
            }
            );
        }
        else {
            // El formulario no es válido, muestra un mensaje de error
            console.log("Formulario no válido")
        }

    }
}