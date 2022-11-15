import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private API_SERVER = "http://localhost:8092/api/vehiculo";

  constructor(private httpClient: HttpClient) { }

  public listvehiculos():Observable<any>{
    return this.httpClient.get(this.API_SERVER+"/getAll");
  }
}
