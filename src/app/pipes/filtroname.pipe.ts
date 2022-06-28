import { Pipe, PipeTransform } from '@angular/core';
import { Pasaje } from '../models/pasaje';

@Pipe({
  name: 'filtroname',
})
export class FiltronamePipe implements PipeTransform {
  pasajes = new Pasaje();
  transform(value: any, arg: any): any {
    if (arg == '' || arg == 'Todos') {
      return value;
    } else {
      const resultFiltro = [];
      for (const pasajes of value) {
        if (pasajes.categoria.indexOf(arg) > -1) {
          resultFiltro.push(pasajes);
        }
      }
      return resultFiltro;
    }
  }
}
