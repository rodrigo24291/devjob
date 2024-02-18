import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayaoutComponent } from './layaout/layaout.component';
import { CreateVacanteComponent } from './create-vacante/create-vacante.component';
import { MisVacantesComponent } from './mis-vacantes/mis-vacantes.component';
import { VacantesDisponiblesComponent } from './vacantes-disponibles/vacantes-disponibles.component';
import { VerVacantesComponent } from './ver-vacantes/ver-vacantes.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerifiGuard } from '../auth/verifi.guard';


const routes: Routes = [
  {path:"",
  component:LayaoutComponent,
  children:[
    {
      path:"index",
      component:BusquedaComponent
    },
    {
      path:"create-vacante",
      component:CreateVacanteComponent,
      canActivate:[VerifiGuard],
      canMatch:[VerifiGuard]
    },
    {
      path:"create-vacante/:id",
      component:CreateVacanteComponent,
      pathMatch:'full',
      canActivate:[VerifiGuard],
      canMatch:[VerifiGuard]
    },
    {
      path:"mis-vacantes",
      component:MisVacantesComponent,
      canActivate:[VerifiGuard],
      canMatch:[VerifiGuard]
    },
    {
      path:"vacantes-disponible",
      component:VacantesDisponiblesComponent
    }
    ,
    {
      path:"ver-vacante/:id",
      component:VerVacantesComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
