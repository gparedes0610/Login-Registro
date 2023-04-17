import { Component, OnInit } from '@angular/core';

/* interface City {
  name: string;
  code: string;
} */

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  
/*   listItems: any[];
  cities: City[];
  selectedCity: City; */

  ruc:any=localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)
  usuarioDataLs:any =localStorage.getItem('usuarioData')
  usuarioData = JSON.parse(this.usuarioDataLs)
  constructor() { }

  ngOnInit(): void {
  /*   this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];

  this.listItems = [{label: 'fa fa-user', value: 'v1'}, {label: 'fa fa-user-cog', value: 'v2'}]; */

    this.ruc=this.usuarioRuc
   this.usuarioData = this.usuarioData
  }

}


