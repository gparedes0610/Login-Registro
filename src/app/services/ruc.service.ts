import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class RucService {
  ruc:any=localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) {
   }
   obtenerDataRuc() {
    
    return this.http.get(`${this.baseUrl}/cabecera/${this.usuarioRuc}`)
   // return this.http.get(`${this.baseUrl}/cabecera`)
    
    
  }
}
