import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../feature/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(AuthService).getToken();
  console.log(token);
  if (!token) {
    inject(AuthService).logout();
    return false;
  }
  return true;
};
