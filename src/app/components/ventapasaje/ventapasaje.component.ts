import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pasaje } from 'src/app/models/pasaje';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PasajeService } from 'src/app/services/pasaje.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-ventapasaje',
  templateUrl: './ventapasaje.component.html',
  styleUrls: ['./ventapasaje.component.css'],
})
export class VentapasajeComponent implements OnInit {
  persona: Persona;
  personas!: Array<Persona>;
  pasaje: Pasaje;
  accion = '';
  ADULTO = 0;
  JUBILADO = 0.5;
  MENOR = 0.25;
  descuento!: number;
  porcentaje!: number;
  CIFRA = 8;
  MINPRECIO = 100;
  MAXPRECIO = 1000000;

  categorialist = ['', 'Menor', 'Adulto', 'Jubilado'];

  constructor(
    private pasajeService: PasajeService,
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.persona = new Persona();
    this.pasaje = new Pasaje();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] == '0' || !params['id']) {
        this.accion = 'new';
        console.log('hola gente');
        console.log(this.accion);
        this.iniciarOjetos();
        this.cargarPersonas();
      } else {
        this.accion = 'update';
        this.iniciarOjetos();
        //this.cargarPersonas();
        this.cargarPasaje(params['id']);

        console.log(params['id']);
      }
    });
  }
  iniciarOjetos() {
    this.pasaje = new Pasaje();
    this.persona = new Persona();
  }
  async cargarPersonas() {
    this.personas = new Array<Persona>();
    this.personaService.getPersonas().subscribe(
      (result) => {
        result.forEach((element: any) => {
          let vPersona = new Persona();
          Object.assign(vPersona, element);
          this.personas.push(vPersona);
        });
      },
      (error) => {
        console.log(error);
        alert('error al cargar Persona');
      }
    );
  }
  async cargarPasaje(id: string) {
    await this.cargarPersonas();

    this.pasajeService.getPasaje(id).subscribe(
      (result) => {
        Object.assign(this.pasaje, result);
        console.log(this.pasaje);
        this.pasaje.pasajero = this.personas.find(
          (item) => item._id == this.pasaje.pasajero._id
        )!;
      },
      (error) => {}
    );
  }
  actualizarPasaje() {
    this.pasajeService.editPasaje(this.pasaje).subscribe(
      (result) => {
        if (result.status == '1') {
          //toast
          alert(result.msg);
          this.irLista();
        }
      },
      (error) => {
        if (error.status == '0') {
          alert(error.msg);
        }
      }
    );
  }

  enviarPasaje(pasaje: NgForm) {
    this.pasaje.fechaCompra = new Date();
    this.pasajeService.addPasaje(this.pasaje).subscribe(
      (result) => {
        if (result.status == '1') {
          //toast
          alert(result.msg);
          this.irLista();
        }
      },
      (error) => {
        if (error.status == '0') {
          alert(error.msg);
        }
      }
    );
  }
  buscarPersona(email: string) {
    this.personaService.getPersonaEmail(email).subscribe(
      (result) => {
        this.persona = result[0];
      },
      (error) => {
        // this.mensaje = 'error no se pudo conectar al servidor';
      }
    );
  }
  irLista() {
    this.router.navigate(['pasajes-vendidos']);
  }

  cuantoDescuento(cat: String, precio: Number) {
    if (this.pasaje.precioPasaje) {
      if ('Menor' == cat) {
        this.porcentaje = this.MENOR;
        this.descuento =
          this.pasaje.precioPasaje - this.pasaje.precioPasaje * this.MENOR;
      } else {
        if ('Jubilado' == cat) {
          this.porcentaje = this.JUBILADO;
          this.descuento =
            this.pasaje.precioPasaje - this.pasaje.precioPasaje * this.JUBILADO;
        } else {
          this.porcentaje = this.ADULTO;
          this.descuento =
            this.pasaje.precioPasaje - this.pasaje.precioPasaje * this.ADULTO;
        }
      }
    }
  }

  reiniciar() {
    window.location.reload();
  }
}
