import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  urlbase: string = 'http://localhost:3000/';
  apibase: string = 'api/persona/';
  urlapi: string = this.urlbase + this.apibase;

  constructor(private readonly _http: HttpClient) {}

  public getPersonas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi;
    return this._http.get(_url, httpOptions);
  }
  public getPersonaEmail(email: String): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const _url = this.urlapi + 'email/' + email;

    return this._http.get(_url, httpOptions);
  }

  public addPersona(transaccion: Persona): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    const _url = this.urlapi;
    console.log(_url);
    let body = JSON.stringify(transaccion);
    console.log(body);
    return this._http.post(_url, body, httpOptions);
  }
}
