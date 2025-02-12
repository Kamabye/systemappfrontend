import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['authorities'] as string[]; // Roles permitidos para la ruta

  const token = authService.getToken();
  //console.info(token);

  if (token !== null && token.length > 0) {
    console.info('Hay un token almacenado en cache');
    console.info(authService.getToken);
    if (authService.isAuthenticated()) {
      const userRoles = authService.getUserRoles();
      //console.info("Redireccionar a admin");


      if (!requiredRoles || requiredRoles.length === 0) {
        return true; // Si no se especifican roles, permite el acceso (opcional)
      }

      if (userRoles && userRoles.some(role => requiredRoles.includes(role))) {
        return true; // Usuario tiene al menos uno de los roles requeridos
      } else {
        router.navigate(['/unauthorized']); // No autorizado
        return false;
      }
    }
  }
  else {
    console.info('No hay token almacenado');
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Si no se especifican roles, permite el acceso (opcional)
    }
  }
  router.navigate(['/login'], { queryParams: { returnUrl: route.url } });
  return false;
};