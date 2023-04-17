import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from '../guards/auth.guard';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { ConsultasComponent } from './consultas/consultas.component';

const routes: Routes = [
    {
        path:'dashboard',
        component:PagesComponent,
        canActivate:[AuthGuard],
        children:[
           
            {
                path:'perfil',component:PerfilComponent
            },
            {
                path:'datos',component:DatosUsuarioComponent
            },
            {
                path:'consultas',component:ConsultasComponent
            },
            {
                path:'**',
                redirectTo:"/dashboard/perfil",
                pathMatch:"full"
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
