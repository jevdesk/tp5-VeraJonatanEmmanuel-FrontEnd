import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Imagen } from 'src/app/models/imagen';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-altalibros',
  templateUrl: './altalibros.component.html',
  styleUrls: ['./altalibros.component.css'],
})
export class AltalibrosComponent implements OnInit {
  accion = '';
  libros: Array<Libro> = [];
  libro: Libro = new Libro();
  //imagen: Imagen = new Imagen();
  libroCtrol = this.formBuilder.group({
    titulo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    destacado: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
  });
  constructor(
    private libroService: LibroService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] == '0') {
        this.accion = 'new';
      } else {
        this.altaLibro(params['id']);
      }
    });
  }
  altaLibro(id: string) {}
  guardarLibro() {
    this.libro = this.libroCtrol.value;
    console.log(this.libro);
    this.libroService.addLibro(this.libro).subscribe(
      (result) => {
        if (result.status == '1') {
          //toast
          alert(result.msg);
          //this.router.navigate(['libros']);
        }
        console.log(this.libro);
      },
      (error) => {
        if (error.status == '0') {
          alert(error.msg);
        }
      }
    );
  }
  librosDestacados() {
    this.router.navigate(['libros']);
  }
  get titulo() {
    return this.libroCtrol.get('titulo') as FormControl;
  }
  get descripcion() {
    return this.libroCtrol.get('descripcion') as FormControl;
  }
  get destacado() {
    return this.libroCtrol.get('destacado') as FormControl;
  }
  get stock() {
    return this.libroCtrol.get('stock') as FormControl;
  }
  get imagen() {
    return this.libroCtrol.get('imagen') as FormControl;
  }
}
