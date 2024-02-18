import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-experiencia',
  templateUrl: './create-experiencia.component.html',
  styleUrls: ['./create-experiencia.component.css'],
})
export class CreateExperienciaComponent {
  constructor(
    private formbuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}
  forms: FormGroup = this.formbuilder.group({
    puesto: [''],
    empresa: [''],
    fecha_inicio: [''],
    fecha_finalizacion: [''],
  });
  onSubmit() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.authservice
        .create_experiencia(headers, this.forms.value)
        .subscribe((data) => {
          if (data) {
            Swal.fire({
              title: `Experiencia laboral agregada agregada`,
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
}
