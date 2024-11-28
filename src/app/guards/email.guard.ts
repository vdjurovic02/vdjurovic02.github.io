import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class EmailGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user : IUser) => {
        if (user.emailVerified) {
          console.log('Guard: User verified, access granted.');
          return true;
        } else {
          console.log('Guard: User not verified, redirecting to verify...');
          this.router.navigate(['/verify']);
          return false;
        }
      })
    );
  }
}
