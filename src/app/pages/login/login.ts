import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ingresar() {
    if (this.usuario === 'admin' && this.clave === '1234') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
