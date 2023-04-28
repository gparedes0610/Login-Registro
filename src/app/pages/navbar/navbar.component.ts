import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  flag: any = localStorage.getItem('usuarioFlag')
  usuarioFlag:any = JSON.parse(this.flag)
  userOn:string=localStorage.getItem('token')

  constructor(private router:Router) { }

  ngOnInit(): void {
  //  console.log('ver useron',this.userOn)
  }
  salir(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }
}
