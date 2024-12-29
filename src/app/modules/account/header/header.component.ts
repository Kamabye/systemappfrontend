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

    this.authService.loginWithCredentials(formData).subscribe({
        next : data => {
            if (data.body != null) {
                console.info("JWT Authenticado");
                this.router.navigate(['/admin/user']);
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

}