import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenerarFacturasService {

  private baseUrl: string = environment.baseUrl
  
  constructor(private http: HttpClient) { }

  generarFacturas(registro: any):Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(`${this.baseUrl}/v1/Invoice`, registro,{headers})
 /*    .subscribe((response) => {
     // console.log('Response:', response);
     alert('Generado!')
 
    }, (error) => {
      console.log('Error:', error);
      alert(`${error.error.Message}`)

    }); */
  }
}
