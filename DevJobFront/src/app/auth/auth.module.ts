import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AuthRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProfileComponent } from './page/profile/profile.component';
import { CreateProfilesComponent } from './page/create-profiles/create-profiles.component';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { CreateEducacionComponent } from './page/create-educacion/create-educacion.component';
import { CreateExperienciaComponent } from './page/create-experiencia/create-experiencia.component';
import { CalendarModule } from 'primeng/calendar';
import { CreateDatospersonalComponent } from './page/create-datospersonal/create-datospersonal.component';
import { EditorModule } from 'primeng/editor';



@NgModule({
  declarations: [
LoginComponent,
RegisterComponent,
ProfileComponent,
CreateProfilesComponent,
CreateEducacionComponent,
CreateExperienciaComponent,
CreateDatospersonalComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
ToggleButtonModule,
FormsModule,
CalendarModule,
EditorModule    
  ]
})
export class AuthModule { }
