import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Registro } from '../interfaces/registro.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

   //registrar
   registrar(registro: Registro) {
    return this.http.post(`${this.baseUrl}/v1/Account/Register`, registro)
  }
}
