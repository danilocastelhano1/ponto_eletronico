import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!localStorage.getItem('token')) {
        this.router.navigate(['/login']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}
