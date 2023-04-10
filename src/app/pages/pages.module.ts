import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    NavbarComponent,
    LoadingComponent,
    ConsultasComponent,
    DatosUsuarioComponent,
    
  ],
  exports:[
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    LoadingComponent,
    ConsultasComponent,
    DatosUsuarioComponent,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
    
  ]
})
export class PagesModule { }
