import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css'],
})
export class TransaccionesComponent implements OnInit {
  transaccion!: Transaccion;
  transacciones: Array<Transaccion> = [];
  transaccionesEmails: Array<Transaccion> = [];
  transaccionesPaises: Array<Transaccion> = [];
  paises = ['ARS', 'BRL', 'USD'];
  monedaOrigen!: String;
  monedaDestino!: String;
  accion = 'todo';
  email!: string;

  constructor(private transaccionService: TransaccionService) {
    this.buscarTransacciones();
  }
  filtrar() {
    this.accion = 'filtro';
  }
  filtroEmail() {
    this.buscarTransacciones();
    this.accion = 'email';
  }
  filtroPais() {
    this.accion = 'pais';
  }
  ngOnInit(): void {}
  buscarTransacciones() {
    this.accion = 'todo';
    this.transaccionService.getTransacciones().subscribe(
      (result) => {
        if (result.status == '1') {
          //toast
          alert(result.msg);
        }
        this.transacciones = result;
        console.log(this.transacciones);
      },
      (error) => {
        if (error.status == '0') {
          alert(error.msg);
        }
      }
    );
  }
  buscarTransaccionesPaises() {
    this.transaccionService
      .getTransaccionesPaises(this.monedaOrigen, this.monedaDestino)
      .subscribe(
        (result) => {
          if (result.status == '1') {
            //toast
            alert(result.msg);
          }
          this.transaccionesPaises = result;
        },
        (error) => {
          if (error.status == '0') {
            alert(error.msg);
          }
        }
      );
  }
  buscarTransaccionesEmail() {
    this.accion = 'email';
    this.transaccionService.getTransaccionesEmails(this.email).subscribe(
      (result) => {
        if (result.status == '1') {
          //toast
          alert(result.msg);
        }
        this.transaccionesEmails = result;
      },
      (error) => {
        if (error.status == '0') {
          alert(error.msg);
        }
      }
    );
  }
}
