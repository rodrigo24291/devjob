import { Component,OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menu',
  templateUrl: './layaout.component.html',
  styleUrls: ['./menu.component.css']
})
export class LayaoutComponent implements OnInit{
  items: MenuItem[]=[];
  menubarStyle:string='background-color: #eee; color: #333;'
  menubarStyleClass: string = 'custom-menubar'; 

ngOnInit(): void {
  this.items = [
    {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                items: [
                    {
                        label: 'Bookmark',
                        icon: 'pi pi-fw pi-bookmark'
                    },
                    {
                        label: 'Video',
                        icon: 'pi pi-fw pi-video'
                    }
                ]
            }
        ]
    }]
  
}}