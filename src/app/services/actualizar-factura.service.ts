import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ActualizarFacturaService {
  private baseUrlProductora: any = environment.baseUrlProductora
  private baseUrl: any = environment.baseUrl
  private tokenProductora: any = localStorage.getItem('tokenProductora')
  private authToken = this.tokenProductora;

  constructor(private http: HttpClient) { 
   
  }

  actualizarFactura(data: any) {
  //  console.log('ver authToken PRODUCTORA =>',this.authToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });
    return this.http.post(`${this.baseUrlProductora}/pedido/ActualizarFactura`, data,{headers})
  }
  NuevoRecepcionFacturas(data: any) {
   // console.log('ver authToken PRODUCTORA =>',this.authToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });
    return this.http.post(`${this.baseUrlProductora}/RecepcionFacturas/NuevoRecepcionFacturas`, data,{headers})
  }
  documents(data: any) {
   // console.log('ver authToken PRODUCTORA =>',this.authToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });
    return this.http.post(`${this.baseUrl}/v1/documents`, data,{headers})
  }
}
