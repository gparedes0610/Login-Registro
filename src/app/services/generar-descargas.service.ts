import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class GenerarDescargasService {
  private baseUrl: any = environment.baseUrl
  constructor(private http: HttpClient) { }

  descargarPdfs(archivo:any, opciones: any){
    return this.http.get(`${this.baseUrl}/v1/AzureBlobStorage/download/${archivo}`, opciones);
  }
}
