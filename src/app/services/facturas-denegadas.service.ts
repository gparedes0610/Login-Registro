import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
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
}
