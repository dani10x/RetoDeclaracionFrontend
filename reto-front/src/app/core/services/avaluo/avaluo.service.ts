import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaluoService {

  private API_SERVER = "http://localhost:8091/api/avaluo";

  constructor(private httpClient: HttpClient) { }

  public getAvaluo(clase:any, modelo:any, cilindraje:any, linea:any):Observable<any>{
    return this.httpClient.get(this.API_SERVER+"/getAvaluo/"+300+"&"+2018+"&"+1300+"&"+10003);
  }
}
