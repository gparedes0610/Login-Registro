

import { RucService} from './../../services/ruc.service'
import { Component, OnInit,ViewChild,AfterViewInit  } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent implements OnInit    {
 
@ViewChild(MatPaginator)paginator:MatPaginator


  constructor(private rucService: RucService) {
  }

  displayedColumns: string[] = [ 'corden','tipodocu_codigo','cserie','cnumero','nimporte'];
  dataSource:any 

  ngOnInit(): void {
    
    this.rucService.obtenerDataRuc().subscribe((data:any) => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator=this.paginator
      //this.dataSource = new MatTableDataSource<any>(data);
    })
  }




 
}
