import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode'; // Assuming jwt-decode is imported correctly

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn: any) => {
        if (isLoggedIn) {
          this.authService.compareRole(true).subscribe((isAdmin) => {
            if (isAdmin) {
              this.router.navigate(['/admin']); // Redirect admin to admin dashboard
            } else {
              this.router.navigate(['/user']); // Redirect user to user dashboard
            }
          });

          return false; // Return false since navigation is handled by redirects
        } else {
          // User is not logged in, allow access to the requested route
          return true;
        }
      }),
      catchError(() => {
        // Handle any errors that occur during authentication check
        // console.error('Error checking authentication status');
        return of(false); // Can also return true or false based on your error handling strategy
      }),
    );
  }
}
