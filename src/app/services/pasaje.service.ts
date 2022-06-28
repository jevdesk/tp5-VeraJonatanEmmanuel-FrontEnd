import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pasaje } from '../models/pasaje';

@Injectable({
  providedIn: 'root',
})
export class PasajeService {
  urlbase: string = 'http://localhost:3000/';
  apibase: string = 'api/pasaje/';
  urlapi: string = this.urlbase + this.apibase;

  constructor(private readonly _http: HttpClient) {}

  public getPasajeses(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi;
    return this._http.get(_url, httpOptions);
  }

  public getPasajesCategoria(categoria: String): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi + 'categoria/' + categoria;
    console.log(_url);
    return this._http.get(_url, httpOptions);
  }

  public addPasaje(pasaje: Pasaje): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    const _url = this.urlapi;
    let body = JSON.stringify(pasaje);
    console.log(body);
    return this._http.post(_url, body, httpOptions);
  }
  public deletePasaje(id: String): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi + id;
    return this._http.delete(_url, httpOptions);
  }
  public editPasaje(pasaje: Pasaje): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    const _url = this.urlapi + pasaje._id;
    let body = JSON.stringify(pasaje);
    console.log(body);
    return this._http.put(_url, body, httpOptions);
  }
  public getPasaje(id: String): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi + id;
    return this._http.get(_url, httpOptions);
  }
}
