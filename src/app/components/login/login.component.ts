import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms'; // Importa FormsModule
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';


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

        //Al inicial validamos si hay una sesion activa para redireccionar.
        //console.info("Ingresamos a ngOnInit login");

        if (this.authService.isAuthenticated()) {
            //            console.info("JWT Authenticado");
            const decoded: any = jwtDecode(this.authService.getToken()!);
            const authorities: string[] = decoded.authorities;

            console.log(authorities);
            if (authorities.includes('ROLE_Administrador')) {
                console.info("Redireccionar a admin");
                this.router.navigate(['/admin']);
            } else if (authorities.includes('ROLE_Editor')) {
                console.info("Redireccionar a user");
                this.router.navigate(['/editor']);
            } else if (authorities.includes('ROLE_Lector')) {
                console.info("Redireccionar a user");
                this.router.navigate(['/lector']);
            }

        }


    }

    login(form: NgForm): void {
        //console.info("Ingresamos a login");
        //console.info(this.credentials);

        if (form.valid) { // Verifica si el formulario es válido
            const body = new URLSearchParams();
            body.set('username', form.value.username);
            body.set('password', form.value.password);

            this.authService.loginWithCredentials(body).subscribe({
                next: data => {
                    if (data.body != null) {
                        //console.info("JWT Authenticado");
                        const decoded: any = jwtDecode(data.body!);
                        const authorities: string[] = decoded.authorities;

                        //console.log(authorities);
                        if (authorities.includes('ROLE_Administrador')) {
                            //console.info("Redireccionar a admin");
                            this.router.navigate(['/admin']);
                        } else if (authorities.includes('ROLE_Editor')) {
                            //console.info("Redireccionar a user");
                            this.router.navigate(['/editor']);
                        } else if (authorities.includes('ROLE_Lector')) {
                            //console.info("Redireccionar a user");
                            this.router.navigate(['/lector']);
                        }
                        else {
                            //console.info("Redireccionar a home");
                            this.router.navigate(['/home']);
                        }

                    }
                },
                error: err => {
                    Swal.fire({
                        title: "¡Algo pasó!",
                        text: `Error: ${err.error}`,
                        icon: "error"
                    });
                    console.error("Error: ", err.error);
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