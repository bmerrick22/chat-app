import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class RouteGuardService implements CanActivate{

  constructor(public authService: AuthService, public router: Router) {}

  canActivate() {
    if (sessionStorage.getItem('currentUser')) {
      console.log("True")
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
