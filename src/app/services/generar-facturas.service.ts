import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class GenerarFacturasService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  generarFacturas(registro: any) {
    return this.http.post(`${this.baseUrl}/v1/Invoice`, registro) // CAMBIAR AQUI 
  }
}
