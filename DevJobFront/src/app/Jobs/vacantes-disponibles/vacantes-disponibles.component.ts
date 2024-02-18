import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Vacante } from '../interfaces/vacante.interface';

@Component({
  selector: 'app-vacantes-disponibles',
  templateUrl: './vacantes-disponibles.component.html',
  styleUrls: ['./vacantes-disponibles.component.css'],
})
export class VacantesDisponiblesComponent implements OnInit {
  constructor(private JobsService: JobsService) {}

  Vacantes: Vacante[] = [];
  ngOnInit(): void {
    this.JobsService.GiveVacantes().subscribe((vacante) => {
      this.Vacantes = vacante.data;
    });
  }
}
