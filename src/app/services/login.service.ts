import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Login } from '../interfaces/login.interface'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl: string = environment.baseUrl
  private baseUrlProductora: string = environment.baseUrlProductora
  constructor(private http: HttpClient) {}

  //login de autenticacion
  login(usu: Login) {
    return this.http.post(`${this.baseUrl}/v1/Account/Login`, usu).pipe(
      map((resp: any) => {
       // console.log('resp =>', resp);
       //  console.log('token =>', resp.token);
         localStorage.setItem('token',resp.token)
         
        localStorage.setItem('usuarioData',JSON.stringify(resp))//aqui guardamos la data del usuario, mas que nada para tener su correo y usuario
      }),
    )
  }
  loginProductura(usu: Login) {
    return this.http.post(`${this.baseUrlProductora}/Account/Login`, usu).pipe(
      map((resp: any) => {
       // console.log('resp =>', resp);
       //  console.log('token =>', resp.token);
         localStorage.setItem('tokenProductora',resp.token)
         
       // localStorage.setItem('usuarioData',JSON.stringify(resp))//aqui guardamos la data del usuario, mas que nada para tener su correo y usuario
      }),
    )
  }


}
