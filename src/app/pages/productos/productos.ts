import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../../services/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.scss',
})
export class Productos {
  private servicio = inject(ProductoService);

  productos: Producto[] = [];

  editando = false;

  producto: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: 1,
  };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.servicio.listar().subscribe((res) => {
      this.productos = res;
    });
  }

  guardar(): void {
    if (this.editando) {
      this.servicio.editar(this.producto).subscribe(() => {
        this.cancelar();
        this.cargar();
      });
    } else {
      this.servicio.agregar(this.producto).subscribe(() => {
        this.cancelar();
        this.cargar();
      });
    }
  }

  editar(p: Producto): void {
    this.editando = true;

    this.producto = {
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      stock: p.stock,
      categoria: p.categoria,
    };
  }

  cancelar(): void {
    this.editando = false;

    this.producto = {
      id: 0,
      nombre: '',
      precio: 0,
      stock: 0,
      categoria: 1,
    };
  }

  eliminar(id: number): void {
    if (!confirm('¿Desea eliminar este producto?')) return;

    this.servicio.eliminar(id).subscribe(() => {
      this.cargar();
    });
  }
}
