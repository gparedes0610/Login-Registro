import { ConsultarPedidosService } from './../../services/consultar-pedidos.service'
import { Component, OnInit } from '@angular/core'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consultar-pedidos',
  templateUrl: './consultar-pedidos.component.html',
  styleUrls: ['./consultar-pedidos.component.css'],
})
export class ConsultarPedidosComponent implements OnInit {
  visible: boolean
  mostrar:boolean
  showDialog() {
    this.visible = true
  }
  funcionEjm(valor:any){
    console.log('ver valor',valor)
  }

  loading = false
  data = []
  p = 1
  searchTerm: string = ''
  copiaDeSearch: string = ''
  ruc: any = localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)

  dataPedidos: any[]
  constructor(private consultarPedidosService: ConsultarPedidosService) {}

  ngOnInit(): void {}

  search() {
    this.copiaDeSearch = this.searchTerm
    if (this.searchTerm == '') {
      alert('No a ingresado nada')
      return
    }
    this.loading = true
    this.consultarPedidosService
      .consultarPedidos(this.searchTerm, this.usuarioRuc)
      .subscribe(
        (result: any) => {
          console.log('ver result', result)
          this.loading = false
          this.data = result
          this.searchTerm = ''
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.error.Message}`,
            showConfirmButton: false,
            timer: 6500,
          })
          this.loading = false
          this.searchTerm = ''
        },
      )
  }
}
