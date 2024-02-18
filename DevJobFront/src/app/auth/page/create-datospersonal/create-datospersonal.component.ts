import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { PerfilData } from '../../interface/perfill.interface';
import { User } from '../../interface/user.interface';
import { Users } from '../../interface/authResponse.interface';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-datospersonal',
  templateUrl: './create-datospersonal.component.html',
  styleUrls: ['./create-datospersonal.component.css'],
})
export class CreateDatospersonalComponent implements OnInit {
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    if (token && id !== null) { 
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.atuhservice.giveperfil(headers, id).subscribe(
        (perfil) => {
          console.log(perfil.data[0].fecha_nacimiento);
            const fechaNacimiento = new Date(perfil.data[0].fecha_nacimiento);
           console.log(perfil.data[0]);
           
              this.forms.patchValue({
                facebook: perfil.data[0].facebook ? perfil.data[0].facebook : "",
                github: perfil.data[0].github ? perfil.data[0].github : "",
                linkedin: perfil.data[0].linkedin ? perfil.data[0].linkedin : "",
                presentacion: perfil.data[0].presentacion ? perfil.data[0].presentacion: "",
                nacionalidad: perfil.data[0].nacionalidad ? perfil.data[0].nacionalidad : "",
                telefono: perfil.data[0].telefono ? perfil.data[0].telefono : "",
                direccion: perfil.data[0].direccion ? perfil.data[0].direccion : "",
                dni: perfil.data[0].dni ? perfil.data[0].dni : "",
                fecha_nacimiento: fechaNacimiento,
                foto: perfil.data[0].foto ? perfil.data[0].foto : ""
              });
          
          
        }
      );
    }}
  constructor(
    private form: FormBuilder,
    private atuhservice: AuthService,
    private router: Router
  ) {}
  selectedFile: File | null = null;
  User!: Users;
  id:string=localStorage.getItem('id') || "";
  forms: FormGroup = this.form.group({
    facebook: [''],
    github: [''],
    linkedin: [''],
    presentacion: [''],
    nacionalidad: [''],
    telefono: [''],
    direccion: [''],
    dni: [''],
    fecha_nacimiento: [''],
    foto: [''],
  });
  onSubmit() {

    const formData = new FormData();
    formData.append('facebook', this.forms.value.facebook);
    formData.append('linkedin', this.forms.value.linkedin);
    formData.append('github', this.forms.value.github);
    formData.append('telefono', this.forms.value.telefono);
    formData.append('presentacion', this.forms.value.presentacion);
    formData.append('direccion', this.forms.value.direccion);
    formData.append('nacionalidad', this.forms.value.nacionalidad);
    formData.append('dni', this.forms.value.dni);
    formData.append('user_id', this.id);
    formData.append('fecha_nacimiento', this.forms.value.fecha_nacimiento);
    formData.append('foto', this.selectedFile || '');
    formData.append('_method', 'PUT');


    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
      
      this.atuhservice.actualizar_datospersonales(headers, formData,this.id)
        .subscribe((data) => {
          console.log(data);
          
          if (data) {
            Swal.fire({
              title: `Datos personales actualizado correctamente`,
              text: 'En unos segundos seras redireccionado',
              icon: 'success',
              willClose: () => {
                this.router.navigateByUrl('auth/create-profiles');
              },
            });
          }
        });
    }
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.updateFileName(this.selectedFile.name);
    } else {
      this.selectedFile = null;
      this.updateFileName('Ningún archivo seleccionado');
    }
  }

  updateFileName(name: string): void {
    const fileNameElement = document.getElementById('fileName');

    if (fileNameElement) {
      fileNameElement.textContent = name;
    }
  }
}
