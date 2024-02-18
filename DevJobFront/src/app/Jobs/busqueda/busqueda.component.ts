import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaData } from '../interfaces/categoria.interface';
import { Select } from '../interfaces/select.interface';
import { Vacante } from '../interfaces/vacante.interface';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  categoria:Select[]=[]
  salario:Select[]=[]
  Vacantes:Vacante[]=[];
  UltimasVacantes:Vacante[]=[];
  vacio:boolean=false


  constructor(private JobService:JobsService, private Formbuil:FormBuilder){
  }
  ngOnInit(): void {
this.JobService.GiveCategory().subscribe((categoria)=>{
 this.categoria=categoria.data.map(data=>{
return {
      value:data.id,
      label:data.categoria
    }
  })
})
    this.JobService.GiveSalarios().subscribe(salario=>{
      this.salario=salario.data.map(data=>{
        return {value:data.id,
          label:data.salario
        }
      })
    })

    this.JobService.ultimasvacantes().subscribe(data=>{
      this.UltimasVacantes=data.data
      
    })

  }

  form:FormGroup=this.Formbuil.group({
    categoria:["",Validators.required],
    salario:['',Validators.required],
    termino:['',Validators.required]
})

onSubmit(){
this.JobService.Busqueda(this.form.value).subscribe(vacante=>{
  console.log(vacante.data);
  
  if(vacante.data.length==0){
    this.Vacantes=[];
    this.vacio=true
    return;
  }
  
  this.Vacantes=vacante.data;
  this.vacio=false
})

}

}
