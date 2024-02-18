import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError,  } from 'rxjs';
import { environment } from 'src/environment/environment';
import { SalaryResponse } from '../Jobs/interfaces/salario.interface'
import { CategoriaResponse } from '../Jobs/interfaces/categoria.interface'
import {VacanteResponse, Vacante} from '../Jobs/interfaces/vacante.interface'
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})


export class JobsService {
  constructor(private Http: HttpClient, private router:Router) {}

 
  

  CrearVacantes(vacante:FormData): Observable<VacanteResponse> {
    vacante.forEach((value, key) => {
      console.log(key + ': ' + value);
    });
    const token = localStorage.getItem('token');
    const headers = new  HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.Http.post<VacanteResponse>(
      `${environment.apiUrl}/vacantes`,
      vacante,{headers:headers}
    );
  }

  GiveCategory():Observable<CategoriaResponse>{
    return this.Http.get<CategoriaResponse>(`${environment.apiUrl}/categoria`)
  }

  GiveSalarios():Observable<SalaryResponse>{
    return this.Http.get<SalaryResponse>(`${environment.apiUrl}/salario`)
  }

GiveVacantesId(id:number):Observable<VacanteResponse>{
  return this.Http.get<VacanteResponse>(`${environment.apiUrl}/vacantes/${id}`).pipe(
 catchError((err)=>{
  this.router.navigateByUrl('create-vacante');
  
  
  return throwError(err);
 })   
  )
}


GiveVacantes():Observable<VacanteResponse>{
  const token = localStorage.getItem('token');
    const headers = new  HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  return this.Http.get<VacanteResponse>(`${environment.apiUrl}/vacantes`,{headers:headers})
}
GiveImage(imageId: number): Observable<Blob> {
  return this.Http.get(`${environment.apiUrl}/image/${imageId}`, { responseType: 'blob' });
}

ActualizarData(id:number,vacante:FormData): Observable<VacanteResponse> {
  const token = localStorage.getItem('token');
    const headers = new  HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

  return this.Http.post<VacanteResponse>(
    `${environment.apiUrl}/vacantes/${id}`,
    vacante,{headers:headers}
  );
}

DeleteData(id:number): Observable<VacanteResponse> {
  const token = localStorage.getItem('token');
  const headers = new  HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.Http.delete<VacanteResponse>(
    `${environment.apiUrl}/vacantes/${id}`,{headers:headers}
  );
}

Busqueda(terminos:object):Observable<VacanteResponse>{
   return this.Http.post<VacanteResponse>(`${environment.apiUrl}/busqueda`,terminos)
}
ultimasvacantes():Observable<VacanteResponse>{
  return this.Http.get<VacanteResponse>(`${environment.apiUrl}/busqueda`)
}

}
