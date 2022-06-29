import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  pasajeCtrl = this.fb.group({
    emailPasajero: ['', [Validators.required]],
    categoriaPasajero: ['', [Validators.required]],
    precioPasaje: [
      '',
      [
        Validators.required,
        Validators.min(this.MINPRECIO),
        Validators.max(this.MAXPRECIO),
      ],
    ],
  });

  constructor(
    private pasajeService: PasajeService,
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
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
    this.pasaje.categoriaPasajero = this.pasajeCtrl.value.categoriaPasajero;
    this.pasaje.precioPasaje = this.pasajeCtrl.value.precioPasaje;
    this.pasaje.fechaCompra = new Date();
    this.pasaje.pasajero = this.persona;
    this.buscarPersona(this.pasajeCtrl.value.emailPasajero);
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

  cuantoDescuento(cat: string, precio: number) {
    if (precio >= this.MINPRECIO) {
      if ('Menor' == cat) {
        this.descuento = precio - precio * this.MENOR;
        this.porcentaje = this.MENOR * 100;
      } else {
        if ('Jubilado' == cat) {
          this.descuento = precio - precio * this.JUBILADO;
          this.porcentaje = this.JUBILADO * 100;
        } else {
          this.descuento = precio - precio * this.ADULTO;
          this.porcentaje = this.ADULTO * 100;
        }
      }
    }
  }
  //variables requeridas por formgroup
  get precioPasaje() {
    return this.pasajeCtrl.get('precioPasaje') as FormControl;
  }
  get categoriaPasajero() {
    return this.pasajeCtrl.get('categoriaPasajero') as FormControl;
  }
  get emailPasajero() {
    return this.pasajeCtrl.get('emailPasajero') as FormControl;
  }

  //botones

  vedePasaje() {}
  actualizar() {}
  cerrar() {}
  onReset(): void {
    this.pasajeCtrl.reset();
  }
}
