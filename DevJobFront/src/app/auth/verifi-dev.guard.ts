import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {  HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VerifiDevGuard implements CanActivate, CanMatch {
  constructor(private auth:AuthService) {}
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
    if (localStorage.getItem('token') ) {
      const token = localStorage.getItem('token');
      const headers = new  HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.auth.checkverification(headers);
    } 

    return false;
    
  }
}
