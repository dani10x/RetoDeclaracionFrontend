import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeclaracionService {

  private API_SERVER = "http://localhost:8093/api/impuesto";

  constructor(private httpClient: HttpClient) { }

  public nuevaDeclaracion(placa:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER+"/create", placa);
  }
}
