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
        this.accion == 'new';

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
        }
      },
      (error) => {
        if (error.status == '0') {
          alert(error.msg);
        }
      }
    );
  }
  guardarCachePasaje() {
    const email = 'email';
    this.buscarPersona(email);
    this.enviarPasaje();
  }
  enviarPasaje() {
    this.pasajeService.addPasaje(this.pasaje).subscribe(
      (result) => {
        if (result.status == '1') {
          //toast
          alert(result.msg);
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
    if (this.pasaje.precioPasaje >= this.MINPRECIO) {
      if ('Menor' == cat) {
        this.descuento =
          this.pasaje.precioPasaje - this.pasaje.precioPasaje * this.MENOR;
        this.porcentaje = this.MENOR * 100;
      } else {
        if ('Jubilado' == cat) {
          this.descuento =
            this.pasaje.precioPasaje - this.pasaje.precioPasaje * this.JUBILADO;
          this.porcentaje = this.JUBILADO * 100;
        } else {
          this.descuento =
            this.pasaje.precioPasaje - this.pasaje.precioPasaje * this.ADULTO;
          this.porcentaje = this.ADULTO * 100;
        }
      }
    }
  }

  //botones

  vedePasaje() {}
  actualizar() {}
  cerrar() {}
  // onReset(): void {
  //  this.pasajeCtrl.reset();
  //}
}
