import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/validation.service';
import { JobsService } from '../jobs.service';
import { Select } from '../interfaces/select.interface'; // Asegúrate de tener la interfaz Select definida
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-vacante',
  templateUrl: './create-vacante.component.html',
  styleUrls: ['./create-vacante.component.css'],
})
export class CreateVacanteComponent implements OnInit {
  salario: Select[] = [];
  categoria: Select[] = [];
  selectedFile: File | null = null;
  imagenCargada = false;
  imagenURL: any;

  Form: FormGroup = this.FormBuilder.group({
    title: ['', [Validators.required, this.validationService.ValidatorString]],
    salario: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    empresa: ['', [Validators.required]],
    time: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  constructor(
    private FormBuilder: FormBuilder,
    private JobsService: JobsService,
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit() {
    if (this.Form.invalid) {
      this.Form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('title', this.Form.value.title);
    formData.append('salario_id', this.Form.value.salario);
    formData.append('categoria_id', this.Form.value.categoria);
    formData.append('empresa', this.Form.value.empresa);
    formData.append('time', this.Form.value.time);
    formData.append('description', this.Form.value.description);
    formData.append('image', this.selectedFile || '');

    this.route.params.subscribe((params) => {
      const id: string | undefined = params['id'];
      if (id) {

        const idNumero: number = parseInt(id, 10);
        formData.append('_method', 'PUT');
 
        this.JobsService.ActualizarData(idNumero,formData).subscribe((data) => {
          console.log(data);
        });
      } else {
        this.JobsService.CrearVacantes(formData).subscribe((data) =>
          console.log(data)
        );
      }
    });
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

  ErrorField(field: string): boolean | null {
    return this.validationService.ErrorField(this.Form, field);
  }

  DescriptionError(field: string): string | null {
    return this.validationService.DescriptionError(this.Form, field);
  }

  ngOnInit(): void {
    this.JobsService.GiveSalarios().subscribe((data) => {
      this.salario = data.data.map((item) => {
        return {
          value: item.id,
          label: item.salario,
        };
      });
    });

    this.JobsService.GiveCategory().subscribe((data) => {
      this.categoria = data.data.map((item) => {
        return {
          value: item.id,
          label: item.categoria,
        };
      });
    });

    this.route.params.subscribe((params) => {
      const id: string | undefined = params['id'];

      if (id) {
        const idNumero: number = parseInt(id, 10);

        if (!isNaN(idNumero)) {
          this.JobsService.GiveVacantesId(idNumero).subscribe((vacante) => {
            const fechaPredeterminada = new Date(vacante.data[0].date);

            this.JobsService.GiveImage(vacante.data[0].id).subscribe(
              (imagenBlob: Blob) => {
                const file = new File([imagenBlob], vacante.data[0].image, {
                  type: 'image/jpeg',
                });
                this.selectedFile = file;
                console.log(this.selectedFile);

                this.createImageFromBlob(imagenBlob);
              }
            );

            const valoresIniciales = {
              title: vacante.data[0].title,
              salario: 3,
              categoria: 3,
              empresa: vacante.data[0].empresa,
              time: fechaPredeterminada,
              description: vacante.data[0].description,
              image: '',
            };
            this.moveOptionToFirstPosition(3);
            this.moveOptionToFirstPositionSlario(3);
            this.Form.setValue(valoresIniciales);
          });
        } else {
          this.router.navigateByUrl('create-vacante');
        }
      }
    });
  }

  moveOptionToFirstPosition(selectedCategoryId: number) {
    console.log(this.categoria);

    const selectedOptionIndex = this.categoria.findIndex(
      (option) => option.value === selectedCategoryId
    );

    if (selectedOptionIndex !== -1) {
      const selectedOption = this.categoria[selectedOptionIndex];
      this.categoria.splice(selectedOptionIndex, 1);
      this.categoria.unshift(selectedOption);
    }
  }
  moveOptionToFirstPositionSlario(selectedSalarioId: number) {
    const selectedOptionIndex = this.salario.findIndex(
      (option) => option.value === selectedSalarioId
    );

    if (selectedOptionIndex !== -1) {
      const selectedOption = this.salario[selectedOptionIndex];
      this.salario.splice(selectedOptionIndex, 1);
      this.salario.unshift(selectedOption);
    }
  }

  createImageFromBlob(imagenBlob: Blob) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imagenURL = reader.result;
        this.imagenCargada = true;
      },
      false
    );

    if (imagenBlob) {
      reader.readAsDataURL(imagenBlob);
    }
  }
}
