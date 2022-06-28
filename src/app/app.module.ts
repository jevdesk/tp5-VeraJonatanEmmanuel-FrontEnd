import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header.component';
import { NavComponent } from './components/layouts/nav.component';
import { FooterComponent } from './components/layouts/footer.component';
import { LibrosComponent } from './components/libros/libros.component';
import { AltalibrosComponent } from './components/libros/altalibros.component';
import { ConversorComponent } from './components/transacciones/conversor.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { PasajevendidosComponent } from './components/ventapasaje/pasajevendidos.component';
import { VentapasajeComponent } from './components/ventapasaje/ventapasaje.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { LibrolistaComponent } from './components/libros/librolista.component';
import { Filetobase64Component } from './components/filetobase64/filetobase64.component';
//import { ClipboardModule } from 'ngx-clipboard';
import { FiltronamePipe } from './pipes/filtroname.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    LibrosComponent,
    AltalibrosComponent,
    ConversorComponent,
    TransaccionesComponent,
    PasajevendidosComponent,
    VentapasajeComponent,
    HomeComponent,
    LibrolistaComponent,
    Filetobase64Component,

    FiltronamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
