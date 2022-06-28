import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { TransaccionesComponent } from './transacciones.component';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css'],
})
export class ConversorComponent implements OnInit {
  transaccion: Transaccion = new Transaccion();
  transacciones: Array<Transaccion> = [];
  data: Array<any> = ['ARS', 'BRL', 'USD'];
  transaccionCtrol = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('')]],
    cantidadOrigen: ['', [Validators.required, Validators.min(1)]],
    monedaOrigen: ['', [Validators.required]],
    monedaDestino: ['', [Validators.required]],
    tasaConversion: ['', [Validators.required, Validators.min(1)]],
  });

  constructor(
    private transaccionService: TransaccionService,
    private listaTransacciones: TransaccionesComponent,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}
  guardartransaccion() {
    this.transaccionService.addTransaccion(this.transaccion).subscribe(
      (result) => {
        if (result.status == '1') {
          //toast
          alert(result.msg);
        }
        this.listaTransacciones.buscarTransacciones();
      },
      (error) => {
        if (error.status == '0') {
          alert(error.msg);
        }
      }
    );
  }
  convertir() {
    this.transaccion.cantidadDestino =
      this.transaccionCtrol.value.cantidadOrigen *
      this.transaccionCtrol.value.tasaConversion;
    this.transaccion.cantidadOrigen =
      this.transaccionCtrol.value.cantidadOrigen;
    this.transaccion.monedaOrigen = this.transaccionCtrol.value.monedaOrigen;
    this.transaccion.monedaDestino = this.transaccionCtrol.value.monedaDestino;
    this.transaccion.tasaConversion =
      this.transaccionCtrol.value.tasaConversion;
    this.transaccion.emailCliente = this.transaccionCtrol.value.email;
    this.guardartransaccion();
  }
  get email() {
    return this.transaccionCtrol.get('email') as FormControl;
  }
  get cantidadOrigen() {
    return this.transaccionCtrol.get('cantidadOrigen') as FormControl;
  }
  get monedaOrigen() {
    return this.transaccionCtrol.get('monedaOrigen') as FormControl;
  }
  get monedaDestino() {
    return this.transaccionCtrol.get('monedaDestino') as FormControl;
  }
  get tasaConversion() {
    return this.transaccionCtrol.get('tasaConversion') as FormControl;
  }
}
