import { Persona } from './persona';

export class Pasaje {
  _id!: string;
  precioPasaje!: number;
  categoriaPasajero!: String;
  fechaCompra!: Date;
  pasajero!: Persona;
  //descuento!: number;
}
