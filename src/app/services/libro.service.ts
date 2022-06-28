import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  urlbase: string = 'http://localhost:3000/';
  apibase: string = 'api/libro/';
  urlapi: string = this.urlbase + this.apibase;

  constructor(private readonly _http: HttpClient) {}

  public getLibros(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi;
    return this._http.get(_url, httpOptions);
  }
  public getLibrosDestacados(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi + 'destacado';

    return this._http.get(_url, httpOptions);
  }

  public addLibro(libro: Libro): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    const _url = this.urlapi;
    let body = JSON.stringify(libro);
    console.log(body);
    return this._http.post(_url, body, httpOptions);
  }
}
