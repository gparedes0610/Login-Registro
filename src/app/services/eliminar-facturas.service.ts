import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class EliminarFacturasService {
  private baseUrl: any = environment.baseUrl
  constructor(private http: HttpClient) { }

     //registrar
     eliminarFactura(factura: any) {
      return this.http.put(`${this.baseUrl}/v1/invoice/estatus`, factura)
    }
}
