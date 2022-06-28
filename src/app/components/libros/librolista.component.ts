import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-librolista',
  templateUrl: './librolista.component.html',
  styleUrls: ['./librolista.component.css'],
})
export class LibrolistaComponent implements OnInit {
  libros: Array<Libro> = [];
  libro: Libro = new Libro();
  inicio = 0;

  constructor(private libroService: LibroService, private router: Router) {
    this.buscarLibros();
  }

  buscarLibros() {
    this.libroService.getLibros().subscribe(
      (result) => {
        this.libros = result;
      },
      (error) => {
        // this.mensaje = 'error no se pudo conectar al servidor';
      }
    );
  }
  ngOnInit(): void {}
  altaLibro() {
    this.router.navigate(['libro-form']);
  }
  siguiente() {
    const max = this.libros.length;
    if (this.inicio < max && max - this.inicio >= 5) {
      this.inicio = this.inicio + 5;
    } else {
      this.inicio = 0;
    }
  }

  anterior() {
    if (this.inicio <= 5 && this.inicio >= 0) {
      this.inicio = 0;
    } else {
      this.inicio = this.inicio - 5;
    }
  }
}
