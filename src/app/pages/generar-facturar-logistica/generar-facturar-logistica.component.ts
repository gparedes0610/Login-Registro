import { Component } from '@angular/core'
import { GenerarFacturaLogisticaService } from 'src/app/services/generar-factura-logistica.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-generar-facturar-logistica',
  templateUrl: './generar-facturar-logistica.component.html',
  styleUrls: ['./generar-facturar-logistica.component.css'],
})
export class GenerarFacturarLogisticaComponent {
  loading = false
  searchTerm: string = ''
  searchTerm2: string = ''
  copiaDeSearch: string = ''
  copiaDeSearch2: string = ''
  ruc: any = localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)
  data: any = {}
  data2: any = {}
  mostrar=false;
  ingredient: string
  constructor(
    private generarFacturaLogisticaService: GenerarFacturaLogisticaService,
  ) {}

  
  search() {
    this.loading = true

    this.copiaDeSearch = this.searchTerm
    this.copiaDeSearch2 = this.searchTerm2
    const regex: RegExp = /^\S+$/;
    if (!regex.test(this.searchTerm)) {
      alert('El término de búsqueda no debe contener espacios en blanco');
      this.searchTerm = '';
      return ;
    }
    if (!regex.test(this.searchTerm2)) {
      alert('El término de búsqueda no debe contener espacios en blanco');
      this.searchTerm2 = '';
      return ;
    }

    if (this.searchTerm == '' || this.searchTerm2 == '' ) {
      alert('No a ingresado nada o falta un valor')
      return
    }
    this.mostrar=true;

    this.generarFacturaLogisticaService
      .consultarDatosFacturas(this.searchTerm, this.searchTerm2)
      .subscribe(
        (result: any) => {
          console.log('ver result', result)
          this.loading = false
          // this.data = result
          this.data2 = result
          this.searchTerm = ''
          this.searchTerm2= ''
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

    this.generarFacturaLogisticaService
      .consultarDatosPedidos(this.searchTerm, this.searchTerm2)
      .subscribe(
        (result: any) => {
          console.log('ver result', result)
          this.loading = false
          // this.data = result
          this.searchTerm = ''
          this.searchTerm2 = ''
          this.data = result
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
