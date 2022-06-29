import { SelectorContext } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pasaje } from 'src/app/models/pasaje';
import { PasajeService } from 'src/app/services/pasaje.service';

@Component({
  selector: 'app-pasajevendidos',
  templateUrl: './pasajevendidos.component.html',
  styleUrls: ['./pasajevendidos.component.css'],
})
export class PasajevendidosComponent implements OnInit {
  pasajes: Array<Pasaje>;
  inicio = 0;
  categorialist = ['Todos', 'Menor', 'Adulto', 'Jubilado'];
  filtronombre = '';
  constructor(private pasajeService: PasajeService, private router: Router) {
    this.pasajes = new Array<Pasaje>();
    this.CargarPasajes();
  }

  ngOnInit(): void {}

  CargarPasajes() {
    this.pasajes = new Array<Pasaje>();

    this.pasajeService.getPasajeses().subscribe(
      (result) => {
        var unPasaje = new Pasaje();
        result.forEach((element: any) => {
          Object.assign(unPasaje, element);
          this.pasajes.push(unPasaje);
          unPasaje = new Pasaje();
        });
      },
      (error) => {}
    );
  }
  cuantoDescuento(cat: String, precio: number) {
    if ('Menor' == cat) {
      return precio - precio * 0.25;
    } else {
      if ('Jubilado' == cat) {
        return precio - precio * 0.5;
      } else {
        return precio - precio * 0;
      }
    }
  }
  irFormulario() {
    this.router.navigate(['ventapasaje', 0]);
  }
  reiniciar() {
    window.location.reload();
  }
  modificarPasaje(pasaje: Pasaje) {
    this.router.navigate(['ventapasaje', pasaje._id]);
  }
  borrarPasaje(pasaje: Pasaje) {
    this.pasajeService.deletePasaje(pasaje._id).subscribe(
      (result) => {
        if (result.status == '1') {
          alert(result.msg);
          this.reiniciar();
        }
      },
      (error) => {}
    );
  }

  siguiente() {
    const max = this.pasajes.length;
    if (this.inicio < max && max - this.inicio >= 5) {
      this.inicio = this.inicio + 5;
    } else {
      this.inicio = 0;
    }
  }

  anterior() {
    if (this.inicio <= 5 && this.inicio >= 0) {
      this.inicio = 0;
    } else {
      this.inicio = this.inicio - 5;
    }
  }
}
