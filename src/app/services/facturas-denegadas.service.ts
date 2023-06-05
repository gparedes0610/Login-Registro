import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class FacturasDenegadasService {
  private baseUrl: any = environment.baseUrl
  constructor(private http: HttpClient) { }

  facturasDenegadas(data:any){
    return this.http.get(`${this.baseUrl}/v1/invoice/rejected/${data}`)
  }

  actualizarFactura(data:any){
    console.log('hola??');
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.put(`${this.baseUrl}/v1/invoice/update`, data,{headers}).subscribe((response) => {
      // console.log('Response:', response);
      alert('actualizado!')
      /*  Swal.fire({
         icon: 'success',
         title: 'Generado!',
         showConfirmButton: false,
         timer: 1500,
       }) */
     }, (error) => {
       console.log('Error:', error);
       alert(`${error.error.Message}`)
     /*   Swal.fire({
         icon: 'error',
         title: `${error.error.Message}`,
         showConfirmButton: false,
         timer: 6500
       }) */
     });
   }

  }


