import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  ruc:any=localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)
  usuarioDataLs:any =localStorage.getItem('usuarioData')
  usuarioData = JSON.parse(this.usuarioDataLs)
  constructor() { }

  ngOnInit(): void {
    this.ruc=this.usuarioRuc
   this.usuarioData = this.usuarioData
  }

}
