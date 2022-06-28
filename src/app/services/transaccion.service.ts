import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {
  urlbase: string = 'http://localhost:3000/';
  apibase: string = 'api/transaccion/';
  urlapi: string = this.urlbase + this.apibase;

  constructor(private readonly _http: HttpClient) {}

  public getTransacciones(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi;
    return this._http.get(_url, httpOptions);
  }
  public getTransaccionesEmails(email: String): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi + 'email/' + email;

    return this._http.get(_url, httpOptions);
  }
  public getTransaccionesPaises(
    origen: String,
    destino: String
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url =
      this.urlapi +
      'countrys/?monedaOrigen=' +
      origen +
      '&monedaDestino=' +
      destino;
    console.log(_url);
    return this._http.get(_url, httpOptions);
  }

  public addTransaccion(transaccion: Transaccion): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    const _url = this.urlapi;
    let body = JSON.stringify(transaccion);
    console.log(body);
    return this._http.post(_url, body, httpOptions);
  }
}
