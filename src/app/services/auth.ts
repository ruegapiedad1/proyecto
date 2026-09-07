import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface LoginResponse { token: string; usuario: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8082';

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, { username, password }).pipe(
      tap(({ token }) => localStorage.setItem('inventario_token', token))
    );
  }

  recuperarClave(correo: string) {
    return this.http.post(`${this.api}/recuperar-clave`, { correo });
  }

  autenticado(): boolean {
    return !!localStorage.getItem('inventario_token');
  }

  token(): string | null {
    return localStorage.getItem('inventario_token');
  }

  cerrarSesion(): void {
    localStorage.removeItem('inventario_token');
  }
}
