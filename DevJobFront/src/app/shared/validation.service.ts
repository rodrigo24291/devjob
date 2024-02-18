import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  ValidatorString(control: FormControl) {
    const value = control.value;

    console.log(isNaN(Number(value)));
    if (!isNaN(Number(value))) {
      console.log('error');

      return {
        NoIsString: true,
      };
    }
    return null;
  }

  ErrorField(Form: FormGroup, field: string): boolean | null {
    return Form.controls[field]
      ? Form.controls[field].errors && Form.controls[field].touched
      : null;
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (control && matchingControl) {
        const controlValue = control.value;
        const matchingControlValue = matchingControl.value;

        if (controlValue !== matchingControlValue) {
          matchingControl.setErrors({ notEqual: true });
          return { notEqual: true };
        } else {
          matchingControl.setErrors(null);
          return null;
        }
      }

      return null;
    };
  }

  DescriptionError(Form: FormGroup, field: string): string | null {
    if (!Form.controls[field].errors) return null;

    const error = Form.controls[field].errors || {};
    for (const key of Object.keys(error)) {
      switch (key) {
        case 'required':
          return 'Campo requerido';
        case 'NoIsString':
          return 'No Es string';
        case '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$':
          return 'Pon un Email Correcto';
        case 'minlength':
          return `El mínimo de caracteres debe ser ${error['minlength'].requiredLength}`;
        case 'notEqual':
          return 'Las contraseñas no coinciden';
        default:
          return null;
      }
    }
    return null;
  }

  
}
