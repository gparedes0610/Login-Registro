import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class GenerarFacturasService {

  private baseUrl: string = environment.baseUrl
  
  constructor(private http: HttpClient) { }

  generarFacturas(registro: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.baseUrl}/v1/Invoice`, registro,{headers}).subscribe((response) => {
      console.log('Response:', response);
      Swal.fire({
        icon: 'success',
        title: 'Generado!',
        showConfirmButton: false,
        timer: 1500
      })
    }, (error) => {
      console.log('Error:', error);
      Swal.fire({
        icon: 'error',
        title: `${error.error.Message}`,
        showConfirmButton: false,
        timer: 6500
      })
    });
  }
}
