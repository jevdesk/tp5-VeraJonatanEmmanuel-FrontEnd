import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  libros: Array<Libro> = [];
  indice: number = 0;
  libro: Libro = new Libro();

  constructor(private libroService: LibroService, private router: Router) {
    this.buscarLibrosDestacados();
  }

  buscarLibrosDestacados() {
    this.libroService.getLibrosDestacados().subscribe(
      (result) => {
        this.libros = result;
        this.iniciar();
      },
      (error) => {
        // this.mensaje = 'error no se pudo conectar al servidor';
      }
    );
  }

  iniciar() {
    if (this.indice < this.libros.length) {
      this.libro = this.libros[this.indice];
    } else {
      console.log(
        'error indice=' + this.indice + ' length= ' + this.libros.length
      );
    }
  }

  siguiente() {
    if (this.indice < this.libros.length) {
      this.indice = this.indice + 1;
      if (this.indice < this.libros.length) {
        this.libro = this.libros[this.indice];
      } else {
        this.indice = 0;
        this.libro = this.libros[this.indice];
      }
    }
  }

  anterior() {
    if (this.indice > 0) {
      this.indice = this.indice - 1;
      if (this.indice < this.libros.length) {
        this.libro = this.libros[this.indice];
      }
    } else {
      this.indice = this.libros.length - 1;
      this.libro = this.libros[this.indice];
    }
  }
  ngOnInit(): void {}
  altaLibro() {
    this.router.navigate(['libro-form']);
  }
}
