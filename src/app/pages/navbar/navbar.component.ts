import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];

  flag: any = localStorage.getItem('usuarioFlag')
  usuarioFlag:any = JSON.parse(this.flag)
  userOn:string=localStorage.getItem('token')

  constructor(private router:Router) { }

  ngOnInit(): void {
  //  console.log('ver useron',this.userOn)
  
  if(this.userOn){
    if(this.usuarioFlag=='Logistica'){
      this.items = [
        {
            label: 'Acciones',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                  label: 'Factura Logistica',
                  icon: 'pi pi-fw pi-bookmark'
              },
                {
                    separator: true
                },
            ]
        },
        {
            label: 'Cerrar sesion',
            icon: 'pi pi-fw pi-power-off',
            command: () => this.salir()
        }
    ];
    }
    else{
      this.items = [
        {
            label: 'Acciones',
            icon: 'pi pi-fw pi-file',
            items: [
              {
                label: 'Panel Inicial',
                icon: 'pi pi-fw pi-bookmark',
                command: () => this.router.navigate(['/dashboard/perfil'])
            },
                {
                  label: 'Datos Personales',
                  icon: 'pi pi-fw pi-bookmark'
                  ,
                command: () => this.router.navigate(['/dashboard/datos'])
              },
              
              {
                label: 'Generar Facturas',
                icon: 'pi pi-fw pi-video'
                ,
                command: () => this.router.navigate(['/dashboard/generarFacturas'])
            },
              {
                label: 'Consultar Facturas',
                icon: 'pi pi-fw pi-trash'
                ,
            command: () => this.router.navigate(['/dashboard/consultas'])
            },
              
              {
                label: 'Facturas Denegadas',
                icon: 'pi pi-fw pi-video'
                ,
                command: () => this.router.navigate(['/dashboard/facturasDenegadas'])
            },
              {
                label: 'Consultar Pedidos',
                icon: 'pi pi-fw pi-video'
                ,
                command: () => this.router.navigate(['/dashboard/consultarPedidos'])
            },
                
                {
                    separator: true
                },
            ]
        },
        {
            label: 'Cerrar sesion',
            icon: 'pi pi-fw pi-power-off',
            command: () => this.salir()
        }
    ];
    }
  }

  }
  
  salir(){
 

    Swal.fire({
      title: 'Estas seguro de cerrar sesion?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Nos vemos!', '', 'success')
        localStorage.removeItem('token')
        this.router.navigateByUrl('/login')
      } else if (result.isDenied) {
        Swal.fire('Okey, seguimos', '', 'info')
      }
    })
    
  }
}
