import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8082';

  // LISTAR
  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.api}/productos`);
  }

  // AGREGAR
  agregar(producto: Producto): Observable<object> {
    return this.http.post(`${this.api}/productos`, producto);
  }

  // EDITAR
  editar(producto: Producto): Observable<object> {
    return this.http.post(`${this.api}/productos/editar`, producto);
  }

  // ELIMINAR
  eliminar(id: number): Observable<object> {
    return this.http.delete(`${this.api}/productos/${id}`);
  }
}
