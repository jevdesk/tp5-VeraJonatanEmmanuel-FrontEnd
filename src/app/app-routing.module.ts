import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AltalibrosComponent } from './components/libros/altalibros.component';
import { LibrosComponent } from './components/libros/libros.component';
import { ConversorComponent } from './components/transacciones/conversor.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { PasajevendidosComponent } from './components/ventapasaje/pasajevendidos.component';
import { VentapasajeComponent } from './components/ventapasaje/ventapasaje.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'libro-form', component: AltalibrosComponent },
  { path: 'transaccion', component: TransaccionesComponent },
  { path: 'conversor-divisa', component: ConversorComponent },
  { path: 'pasajes', component: PasajevendidosComponent },
  { path: 'ventapasaje', component: VentapasajeComponent },
  //{ path: 'ventapasaje/0', component: VentapasajeComponent },
  { path: 'ventapasaje/:id', component: VentapasajeComponent },
  { path: 'pasajes-vendidos', component: PasajevendidosComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
