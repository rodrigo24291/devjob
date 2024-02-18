import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { ProfileComponent } from './page/profile/profile.component';
import { CreateProfilesComponent } from './page/create-profiles/create-profiles.component';
import { CreateEducacionComponent } from './page/create-educacion/create-educacion.component';
import { CreateExperienciaComponent } from './page/create-experiencia/create-experiencia.component';
import { CreateDatospersonalComponent } from './page/create-datospersonal/create-datospersonal.component';

const routes: Routes = [
{path:"login",
component:LoginComponent
},
{
  path:'register',
  component:RegisterComponent
}
,
{
  path:'profiles',
  component:ProfileComponent
}
,
{
  path:'create-profiles',
  component:CreateProfilesComponent
},
{
  path:'create-educacion/:grado',
  component:CreateEducacionComponent
},
{path:'create-experiencia',
  component:CreateExperienciaComponent
},
{path:'create-datospersonal',
  component:CreateDatospersonalComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
