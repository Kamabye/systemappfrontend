import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtiene los authorities definidos para el Route actual ver en app.routes.ts
  const authoritiespermitidos = route.data['authorities'] as string[]; 


  // Si no se especifican roles, permite el acceso (opcional)
  if (!authoritiespermitidos || authoritiespermitidos.length === 0) {
    return true;
  }

  if (authService.isAuthenticated()) {
    const rolesUserToken = authService.getUserRolesToken();
    if (rolesUserToken && rolesUserToken.some(role => authoritiespermitidos.includes(role))) {
      return true; // Usuario tiene al menos uno de los roles requeridos
    } else {
      router.navigate(['/unauthorized']); // No autorizado
      return false;
    }
  }
  router.navigate(['/login'], { queryParams: { returnUrl: route.url } });
  return false;
};