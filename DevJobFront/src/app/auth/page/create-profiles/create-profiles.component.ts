import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpHeaders } from '@angular/common/http';
import { PerfilData } from '../../interface/perfill.interface';


@Component({
  selector: 'app-create-profiles',
  templateUrl: './create-profiles.component.html',
  styleUrls: ['./create-profiles.component.css']
})
export class CreateProfilesComponent implements OnInit{
  constructor(private authservice:AuthService){}
  Perfil?:PerfilData
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    if (token && id !== null) { 
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    this.authservice.giveperfiles(headers).subscribe(data=>{
      console.log(data);
      
this.Perfil=data.data[0]
    })

  }
console.log(this.Perfil);

}

  visible: boolean = false;
  checked: boolean = false;


  showDialog() {
      this.visible = true;
  }
}
