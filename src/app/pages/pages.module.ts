import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    NavbarComponent,
  ],
  exports:[
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }
