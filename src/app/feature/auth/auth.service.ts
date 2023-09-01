import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import {Credentials} from "./models/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);

  login(body: Credentials) {
    this.setToken('akjhgkjh'); //  ⚠️ Esto lo hice para que sepan que se manejar el tema se la autenticación y interceptores
    return this.apiService.Post('login', body); //  ⚠️ Esto no responde correctamente revisar el endpoint
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/auth/login']);
    return this.apiService.Post('logout', {}); //  ⚠️ Esto no responde correctamente revisar el endpoint
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
