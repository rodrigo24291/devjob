import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Vacante } from '../interfaces/vacante.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mis-vacantes',
  templateUrl: './mis-vacantes.component.html',
  styleUrls: ['./mis-vacantes.component.css']
})
export class MisVacantesComponent implements OnInit {

  constructor(private jobsService:JobsService) {
    
  }

vacantes?:Vacante[]

ngOnInit(): void {
  this.jobsService.GiveVacantes().subscribe(data=>{
    this.vacantes=data.data
  })
}

onDelete(id:number){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.jobsService.DeleteData(id).subscribe((data)=>{
        this.jobsService.GiveVacantes().subscribe(updatedData => {
          this.vacantes = updatedData.data;
        });
        
      })
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}

}
