import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RucService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) {
   }
 
   obtenerDataRuc(usuario:any){
    return this.http.get(`${this.baseUrl}/cabecera/${usuario}`)
  }
}
