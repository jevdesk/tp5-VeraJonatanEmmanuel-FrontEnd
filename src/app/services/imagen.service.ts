import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Image {
  nome: String;
  //peso: number;
  // tipo: String;
  //base: String;
}

@Injectable()
export class ImagenService {
  /* private imagenObservablep: BehaviorSubject<Image> =
    new BehaviorSubject<Image>({ nome: 'hola' });
  constructor() {}

  get imagenObservable() {
    return this.imagenObservablep.asObservable();
  }

  set imagenObservable(data: Image) {
    this.imagenObservablep.next(data);
  }*/
}
