import { Persona } from './persona';

export class Pasaje {
  _id!: string;
  precioPasaje!: Number;
  categoriaPasajero!: String;
  fechaCompra!: Date;
  pasajero!: Persona;
}
