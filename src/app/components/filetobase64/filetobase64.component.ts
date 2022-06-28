import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Imagen } from 'src/app/models/imagen';
import { Libro } from 'src/app/models/libro';
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'app-filetobase64',
  templateUrl: './filetobase64.component.html',
  styleUrls: ['./filetobase64.component.css'],
})
export class Filetobase64Component implements OnInit {
  imagen!: Imagen;
  libro!: Libro;
  libros: Array<Libro> = [];
  nombre: string = '';
  peso: number = 0;
  tipo: string = '';
  base: string = '';
  accion = true;

  constructor(private clipboardApi: ClipboardService) {
    this.imagen = new Imagen();
  }

  ngOnInit(): void {}
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file);
    this.nombre = file.name;

    this.peso = file.size;

    this.tipo = file.type;
  };

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((variable) => {
      this.base = variable;
      //this.cd.markForCheck();
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  subirImage() {
    this.imagen.nombre = this.nombre;
    //this.cd.markForCheck();
    this.imagen.tipo = this.tipo;
    //this.cd.markForCheck();
    this.imagen.base = this.base;
    //this.cd.markForCheck();
    console.log(this.imagen);
  }
  copyText() {
    this.clipboardApi.copyFromContent(this.base);
    this.accion = false;
  }
}
