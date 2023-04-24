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
  ]
})
export class PagesModule { }
