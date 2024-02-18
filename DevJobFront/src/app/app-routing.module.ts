import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path:'auth',
  loadChildren:()=>import('./auth/app-routing.module').then((m)=>m.AuthRoutingModule)
},
{
  path:'jobs',
  loadChildren:()=>import('./Jobs/jobs-routing.module').then((m)=>m.JobsRoutingModule)
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
