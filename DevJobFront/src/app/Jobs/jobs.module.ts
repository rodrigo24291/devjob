import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { ImageModule } from 'primeng/image';




import { JobsRoutingModule } from './jobs-routing.module';
import { LayaoutComponent } from './layaout/layaout.component';
import { CreateVacanteComponent } from './create-vacante/create-vacante.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MisVacantesComponent } from './mis-vacantes/mis-vacantes.component';
import { VacantesDisponiblesComponent } from './vacantes-disponibles/vacantes-disponibles.component';
import { VerVacantesComponent } from './ver-vacantes/ver-vacantes.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
  declarations: [
    LayaoutComponent,
    CreateVacanteComponent,
    MisVacantesComponent,
    VacantesDisponiblesComponent,
    VerVacantesComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    EditorModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginatorModule,

  ]
})
export class JobsModule { }
