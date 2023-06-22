import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class GenerarFacturaLogisticaService {
  private baseUrl: string = environment.baseUrl
  
  constructor(private http: HttpClient) { }

  consultarDatosFacturas(nrPedido:any,rucUsuario:any){
    return this.http.get(`${this.baseUrl}/v1/invoice/pedido/${nrPedido}/${rucUsuario}`)
  }
  consultarDatosPedidos(nrPedido:any,rucUsuario:any){
    return this.http.get(`${this.baseUrl}/pedido/detail/${nrPedido}/${rucUsuario}`)
  }

  consultarListado(){
    return this.http.get(`${this.baseUrl}/v1/invoice/pending`)
  }
}
