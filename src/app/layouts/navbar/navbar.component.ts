import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../feature/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <a [routerLink]="['/teams/list']" routerLinkActive="active">
        Lista de Equipos
      </a>
      <a [routerLink]="['/teams/create']" routerLinkActive="active">
        Crear Equipo
      </a>
      <a class="logout" (click)="logout()">Cerrar Sesión</a>
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 100vw;
      }

      .navbar {
        display: flex;
        background-color: #f8f8f8;
        padding: 14px 16px;
      }

      .navbar a {
        display: block;
        cursor: pointer;
        padding: 16px;
        color: #616161;
        font-size: 17px;
        text-align: center;
        text-decoration: none;

        &.active {
          border-bottom: 2px solid #000000;
          color: #000000;
        }
      }

      .navbar a.logout {
        margin-left: auto;
        color: #786565;
      }

      .navbar a:hover {
        color: #000000;
      }
    `,
  ],
})
export class NavbarComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout().subscribe(() => {
       window.location.reload();
    });
  }
}
