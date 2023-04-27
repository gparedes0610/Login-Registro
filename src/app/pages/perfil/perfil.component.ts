import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  flag: any = localStorage.getItem('usuarioFlag')
  usuarioFlag = JSON.parse(this.flag)
  constructor() { }

  ngOnInit(): void {
    
  }
 
}
