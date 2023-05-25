import { FacturasDenegadasService } from './../../services/facturas-denegadas.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-facturas-denegadas',
  templateUrl: './facturas-denegadas.component.html',
  styleUrls: ['./facturas-denegadas.component.css'],
})
export class FacturasDenegadasComponent implements OnInit {

  items: [];
  totalRecords: number;
  rowsPerPage: number;

  loading = true
  data = []
  p = 1
  ruc: any = localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)

  ngOnInit(): void {
    this.facturasDenegadasService
      .facturasDenegadas(this.usuarioRuc)
      .subscribe((res: any) => {
        console.log('res =>', res)
        this.items =res
        this.totalRecords = this.items.length;
        this.rowsPerPage = 5;
        //
        this.data = res
        this.loading=false
      })
  }



  constructor(private facturasDenegadasService: FacturasDenegadasService) {}
}
