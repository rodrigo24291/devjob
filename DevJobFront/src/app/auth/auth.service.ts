import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from './interface/user.interface';
import { environment } from 'src/environment/environment';
import { pipe, tap, Observable,map, catchError,of } from 'rxjs';
import { AuthResponse, Users } from './interface/authResponse.interface';
import {Experiencia, Educacion, PerfilData, ProfileResponse} from './interface/perfill.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

User!:Users

  register(user:User):Observable<AuthResponse>{
   return this.http.post<AuthResponse>(`${environment.apiUrl}/register`,user).pipe(
    tap((data)=>{
      if(!data.error){
        localStorage.setItem('token',data.data.token)
        this.User=data.data.user
      }
})
   )
   
  }

  login(user:object):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.apiUrl}/login`,user).pipe(
      tap(data=>{
        console.log();
        
        if(!data.error){
          
          localStorage.setItem('token',data.data.token);
          
          localStorage.setItem('id',data.data.user.id.toString());
          this.User=data.data.user
        }
      })
    )
   }

   logout(headers:HttpHeaders):Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/logout`,{headers:headers}).pipe(tap(log=>{
      localStorage.removeItem('token')
    }));
   }

   checkverification(headers:HttpHeaders):Observable<boolean>{
    return this.http.get<boolean>(`http://127.0.0.1:8000/api/verificar-token`,{headers:headers}).pipe(
      map(data=>!!data),
      tap(data=>console.log(data)),
      catchError(data=>of(false))
    ) 
   }

   create_experiencia(headers:HttpHeaders,experiencia:object):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${environment.apiUrl}/experiencia`,experiencia,{headers:headers})
   }

   
   create_educacion(headers:HttpHeaders,educacion:Object):Observable<Educacion>{
    return this.http.post<Educacion>(`${environment.apiUrl}/educacion`,educacion,{headers:headers})
   }
   actualizar_datospersonales(headers:HttpHeaders,data:FormData,id:string):Observable<Educacion>{
    return this.http.post<Educacion>(`${environment.apiUrl}/perfil/${id}`,data,{headers:headers})
   }
   giveperfil(headers:HttpHeaders,id:string){
    return this.http.get<any>(`${environment.apiUrl}/perfil/${id}`,{headers:headers})
   }

   giveperfiles(headers:HttpHeaders):Observable<ProfileResponse>{
    return this.http.get<ProfileResponse>(`${environment.apiUrl}/perfil`,{headers:headers})
   }

}
