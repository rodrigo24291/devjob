import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VerifiGuard implements CanActivate, CanMatch {
  constructor(private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const headers = new  HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.auth.checkverification(headers);
    }

    return false;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | boolean {
    if (localStorage.getItem('token') && this.auth.User && this.auth.User.rol === "2") {
      const token = localStorage.getItem('token');
      const headers = new  HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.auth.checkverification(headers);
    } 

    return false;
    
  }
}
