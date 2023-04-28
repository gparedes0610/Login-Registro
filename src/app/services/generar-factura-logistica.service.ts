import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class GenerarFacturaLogisticaService {
  private baseUrl: string = environment.baseUrl
  
  constructor(private http: HttpClient) { }

  consultarDatosFacturas(OS3447:any,rucUsuario:any){
    return this.http.get(`${this.baseUrl}/v1/invoice/pedido/${OS3447}/${rucUsuario}`)
  }
  consultarDatosPedidos(OS3447:any,rucUsuario:any){
    return this.http.get(`${this.baseUrl}/pedido/detail/${OS3447}/${rucUsuario}`)
  }
}
