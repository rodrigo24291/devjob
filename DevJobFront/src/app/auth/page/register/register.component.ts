import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidationService, emailPattern } from 'src/app/shared/validation.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SelectItem } from 'primeng/api';
import { Select } from 'src/app/Jobs/interfaces/select.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private FormBuilder: FormBuilder, private ValidationService: ValidationService,
    private authservice:AuthService, private router:Router
    ) { }

  Form: FormGroup = this.FormBuilder.group({
    name: ['', [Validators.required, this.ValidationService.ValidatorString]],
    rol: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    password_confirm: ['', [Validators.required, Validators.minLength(4)]]
  }, {
    validators: this.ValidationService.confirmedValidator('password', 'password_confirm')
  });

rol:Select[]=[
{value:1, label:"Developer"},
{value:2,label:"Recluter"}
]

  OnSubmit(): void {
    if (this.Form.invalid) {
   console.log(this.Form);
   
      this.Form.markAllAsTouched();
      return;
    }

   this.authservice.register(this.Form.value).subscribe(data=>{
    console.log(data);
    
if(!data.error){
  Swal.fire({
    title: "Te Registraste Con Existo",
    text: "You clicked the button!",
    icon: "success",
    willClose: () => {
      this.router.navigateByUrl('jobs/index');
    }
  });
}
   })


    

  }

  

  ErrorField(field: string) {
    return this.ValidationService.ErrorField(this.Form, field);
  }

  ErrorMessage(field: string) {
    return this.ValidationService.DescriptionError(this.Form, field);
  }
}
