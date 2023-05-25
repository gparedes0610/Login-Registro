import { RucService } from './../../services/ruc.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent implements OnInit {

  items: [];
  totalRecords: number;
  rowsPerPage: number;
  
  ruc: any = localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)
  loading = false

  @ViewChild(MatPaginator) paginator: MatPaginator;


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

/*     this.items = [
      { name: 'Item 1', category: 'Category A' },
      { name: 'Item 2', category: 'Category B' },
      // ... otros elementos ...
    ];

    this.totalRecords = this.items.length; */
    this.rowsPerPage = 5; // Número de filas por página



    this.loading = true;
    this.rucService.obtenerDataRuc(this.usuarioRuc).subscribe((data: any) => {
      console.log(data);
      setTimeout(() => {
        this.items =data
        this.totalRecords = this.items.length;
        this.rowsPerPage = 5;
        //
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator; // Configurar el paginador
        this.loading = false;
      }, 2500);
    });
  }
}
