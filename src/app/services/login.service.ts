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

  constructor(private http: HttpClient) {}

  //login de autenticacion
  login(usu: Login) {
    return this.http.post(`${this.baseUrl}Account/Login`, usu).pipe(
      map((resp: any) => {
       // console.log('resp =>', resp);
       //  console.log('token =>', resp.token);
         localStorage.setItem('token',resp.token)
      }),
    )
  }
}
