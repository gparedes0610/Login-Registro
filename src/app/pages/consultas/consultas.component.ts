import { RucService } from './../../services/ruc.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent implements OnInit {
  ruc: any = localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)
  loading = false

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private rucService: RucService) {}

  displayedColumns: string[] = [
    'corden',
    'tipodocu_codigo',
    'cserie',
    'cnumero',
    'nimporte',
  ]
  dataSource: any

  ngOnInit(): void {
    this.loading = true
    this.rucService.obtenerDataRuc(this.usuarioRuc).subscribe((data: any) => {
      console.log(data)
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
        this.loading = false
      }, 2500) //paginacion esta fallando
      //this.dataSource = new MatTableDataSource<any>(data);
    })
  }
}
