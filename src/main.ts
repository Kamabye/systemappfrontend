import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { environment } from './environments/environment';

import Swal from 'sweetalert2';

if (environment.production) {
  enableProdMode();
}


//platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => Swal.fire('Error al cargar los datos', `${err.error.mensaje}`, 'warning'));