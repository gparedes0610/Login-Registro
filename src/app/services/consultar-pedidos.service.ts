import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class ConsultarPedidosService {
  private baseUrl: any = environment.baseUrl
  constructor(private http: HttpClient) { }

  consultarPedidos(OS3447:any,rucUsuario:any){
    return this.http.get(`${this.baseUrl}/pedido/${OS3447}/${rucUsuario}`)
  }
}
