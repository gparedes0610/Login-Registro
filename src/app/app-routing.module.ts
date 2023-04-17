import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { RegistroComponent } from './pages/registro/registro.component'
import { PagesRoutingModule } from './pages/pages.routing'
import { RecoverpasswordComponent } from './pages/recoverpassword/recoverpassword.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar-contraseña', component: RecoverpasswordComponent },
  { path: '', redirectTo: '/login',pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
