import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//componentes
import { FechaNormalPipe } from '../pipes/fecha-normal.pipe';
import { GenerarFacturarLogisticaComponent } from './generar-facturar-logistica/generar-facturar-logistica.component';
import { FacturasDenegadasComponent } from './facturas-denegadas/facturas-denegadas.component';
import { FacturaDenegadaComponent } from './factura-denegada/factura-denegada.component';
import { GenerarFacturasComponent } from './generar-facturas/generar-facturas.component';
import { ConsultarPedidosComponent } from './consultar-pedidos/consultar-pedidos.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { FooterComponent } from './footer/footer.component';
import { RecoverpasswordComponent } from './recoverpassword/recoverpassword.component';
//angular material
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
//primeng
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrimengModule } from './primeng/primeng.module';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    NavbarComponent,
    LoadingComponent,
    ConsultasComponent,
    DatosUsuarioComponent,
    FooterComponent,
    RecoverpasswordComponent,
    GenerarFacturasComponent,
    ConsultarPedidosComponent,
    GenerarFacturarLogisticaComponent,
    FacturasDenegadasComponent,
    FacturaDenegadaComponent,
    FechaNormalPipe,
  ],
  exports:[
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    LoadingComponent,
    ConsultasComponent,
    DatosUsuarioComponent,
    NavbarComponent,
    FooterComponent,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    DropdownModule,
    HttpClientModule,
    PrimengModule,
    TableModule,
    PaginatorModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    PrimengModule,
    TableModule,
    PaginatorModule
  ]
})
export class PagesModule { }
