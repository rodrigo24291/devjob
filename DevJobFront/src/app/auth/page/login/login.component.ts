import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ValidationService, emailPattern } from 'src/app/shared/validation.service';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private validationService:ValidationService, private FormBuilder:FormBuilder,
  private authservice:AuthService, private router:Router){}

Form:FormGroup=this.FormBuilder.group({
email:['',[Validators.required,Validators.pattern(emailPattern)]],
password:['',[Validators.required]]  
});

OnSubmit():void{
  console.log('ho');
  
  if(this.Form.invalid){
    this.Form.markAllAsTouched();
  }

  this.authservice.login(this.Form.value).subscribe(data=>{
    if(!data.error){
      Swal.fire({
        title: "Te Leogueaste Con Existo",
        text: "En unos segundos seras redireccionado",
        icon: "success",
        willClose: () => {
          this.router.navigateByUrl('jobs/index');
        }
      });
    }
    
  })
}


ErrorFIeld(field:string):null | boolean{
  return this.validationService.ErrorField(this.Form,field);
}

ErrorMessage(field:string){
return this.validationService.DescriptionError(this.Form,field);
}

}
