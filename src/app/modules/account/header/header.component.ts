import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  title: string = 'KAMABYEAPP';

  token: string = '';

  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.info("HeaderComponent ngOnInit");

  }

  login(): void {
    console.info("Ingresamos a login");
    console.info(this.credentials);

    const formData = new FormData();
    formData.append('username', this.credentials.username);
    formData.append('password', this.credentials.password);

    this.authService.loginWithCredentials(formData).subscribe(
        (response) => {
            if (response.body != null) {
                console.info("JWT Authenticado");
                this.token = response.body;
                console.info(this.token);
                this.authService.loguear(this.token);
                if(this.authService.getRole() == "ADMIN"){
                    console.info("Redireccionando a /admin");
                    this.router.navigate(['/admin']);
                }
                else{
                    console.info("Redireccionando a /account");
                    this.router.navigate(['/account']);
                }
                
            }              
        },
        (error) => {
            // Manejar errores de autenticación
            console.error('Error al iniciar sesión', error);
        }
    );
}

}