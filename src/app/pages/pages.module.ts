import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { FooterComponent } from './footer/footer.component';
import { RecoverpasswordComponent } from './recoverpassword/recoverpassword.component';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';

import { DropdownModule } from 'primeng/dropdown';
import { GenerarFacturasComponent } from './generar-facturas/generar-facturas.component';
import { ConsultarPedidosComponent } from './consultar-pedidos/consultar-pedidos.component';
import { HttpClientModule } from '@angular/common/http';
//ng
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
//ngx
import { NgxPaginationModule } from 'ngx-pagination';
import { GenerarFacturarLogisticaComponent } from './generar-facturar-logistica/generar-facturar-logistica.component';

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
    ButtonModule,
    TreeTableModule,
    PaginatorModule,
    
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
    ButtonModule,
    TreeTableModule,
    PaginatorModule,
    NgxPaginationModule,
    DialogModule,
    RadioButtonModule,
    CardModule
  ]
})
export class PagesModule { }
