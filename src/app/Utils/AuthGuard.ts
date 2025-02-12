import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRoles = authService.getUserRoles();

  if (authService.isAuthenticated()) {
    const requiredRoles = route.data['authorities'] as string[]; // Roles permitidos para la ruta

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Si no se especifican roles, permite el acceso (opcional)
    }

    if (userRoles && userRoles.some(role => requiredRoles.includes(role))) {
      return true; // Usuario tiene al menos uno de los roles requeridos
    } else {
      router.navigate(['/unauthorized']); // No autorizado
      return false;
    }
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: route.url } });
    return false;
  }
};