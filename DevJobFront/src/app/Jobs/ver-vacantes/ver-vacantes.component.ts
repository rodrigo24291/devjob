import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import { Vacante } from '../interfaces/vacante.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ver-vacantes',
  templateUrl: './ver-vacantes.component.html',
  styleUrls: ['./ver-vacantes.component.css'],
})
export class VerVacantesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private jobService: JobsService) {}
  Vacante!: Vacante;
  imagen: any;
  cv!: File;
  error: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((id) => {
      this.jobService.GiveVacantesId(id['id']).subscribe((data) => {
        this.Vacante = data.data[0];

        this.jobService.GiveImage(data.data[0].id).subscribe((id) => {
          this.imagen = id;
          this.convertirBlobAUrl();
        });
      });
    });
  }

  convertirBlobAUrl() {
    const blob = new Blob([this.imagen], { type: 'image/jpeg' });
    this.imagen = URL.createObjectURL(blob);
  }

  onFileChange(event: any): void {
    this.cv = event.target.files[0] as File;
  }

  onSubmit(): void {
    if (this.cv && this.cv.type !== 'application/pdf'    || this.cv ==undefined || this.cv == null ) {
      this.error = true;
      return;
    }
    Swal.fire({
      title: "Tu curriculum fue enviado con exito!",
      text: "Clickea para cerrarlo!",
      icon: "success"
    });

  }
}
