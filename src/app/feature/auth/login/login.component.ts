import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Credentials } from '../models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /*Inject*/
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    this.authService.login(this.data).subscribe(
      () => {
        this.router.navigate(['/teams/list']);
      },
      () => {
        this.router.navigate(['/teams/list']);
      },
    );
  }

  getError(path: string | (string | number)[], errorCode?: string): boolean {
    const formControl = this.loginForm.get(path);

    if (!formControl) {
      return false;
    }

    if (errorCode) {
      return !!formControl.getError(errorCode) && formControl.touched;
    }

    return !!formControl.errors && formControl.touched;
  }

  get data() {
    return this.loginForm.value as Credentials;
  }
}
