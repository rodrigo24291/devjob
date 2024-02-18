import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from 'src/app/Jobs/interfaces/select.interface';
import { FormBuilder,FormGroup } from '@angular/forms';
import {  HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-create-educacion',
  templateUrl: './create-educacion.component.html',
  styleUrls: ['./create-educacion.component.css']
})
export class CreateEducacionComponent implements OnInit{
constructor(private acivatedrouter:ActivatedRoute,private formbuilder:FormBuilder, private router:Router,
  private authservice:AuthService
  ){}

nivel!:string
  ngOnInit(): void {
    this.acivatedrouter.params.subscribe(data=>{
 console.log(data['grado']!== "superior");
 
 
      if(data['grado'] === "primaria" || data['grado'] === "secundaria" || data['grado'] === "superior"){

        this.nivel=data['grado'];  
        
      return;
      
      }
      else{
        this.router.navigateByUrl('create-profiles');
       
      }
    })
    
  }

forms:FormGroup=this.formbuilder.group({
  estado:[""],
  fecha_inicio:[""],
  nivel:[''],
  fecha_finalizacion:[""],
  institucion:[""]

})  
finalizado:Select[]=[
  {label:'----------------Seleccione el Nivel Alcanzado------------------', value:""},
  {label:'En progreso', value:1},
  {label:'Pendiente', value:2},
  {label:'Completo', value:3}
]
date: Date | undefined;
onSubmit(){
  this.forms.controls['nivel'].setValue(this.nivel);
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    const headers = new  HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.authservice.create_educacion(headers,this.forms.value).subscribe(data=>{
      if(data){

        Swal.fire({
          title: `Educacion ${this.nivel} agregada`,
          text: "En unos segundos seras redireccionado",
          icon: "success",
          willClose: () => {
            this.router.navigateByUrl('auth/create-profiles');
          }
        })

      }
      return;
    })
  }
  
}

}
