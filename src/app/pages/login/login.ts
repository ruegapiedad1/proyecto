import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  usuario = '';
  clave = '';
  mostrarClave = false;
  mostrarRecuperacion = false;
  recuperacionEnviada = false;
  correoRecuperacion = '';
  error = '';
  cargando = false;

  constructor(private router: Router, private auth: AuthService) {}

  ingresar() {
    this.error = '';
    this.cargando = true;
    this.auth.login(this.usuario.trim(), this.clave).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (response) => {
        this.error = response.error?.error || 'No se pudo conectar con el servidor.';
        this.cargando = false;
      },
    });
  }

  abrirRecuperacion() {
    this.mostrarRecuperacion = true;
    this.recuperacionEnviada = false;
    this.correoRecuperacion = '';
  }

  cerrarRecuperacion() {
    this.mostrarRecuperacion = false;
  }

  enviarRecuperacion() {
    this.auth.recuperarClave(this.correoRecuperacion).subscribe({
      next: () => this.recuperacionEnviada = true,
      error: (response) => this.error = response.error?.error || 'No se pudo procesar la solicitud.',
    });
  }
}
