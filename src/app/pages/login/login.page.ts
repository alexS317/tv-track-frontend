import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInputPasswordToggle,
  IonInput,
  IonText,
  IonRouterLinkWithHref,
} from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { AppRoutes } from '../../app.routes';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonText,
    IonButton,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInputPasswordToggle,
    ReactiveFormsModule,
    RouterLink,
    IonRouterLinkWithHref,
  ],
})
export class LoginPage {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);
  protected readonly routes = AppRoutes;
  protected readonly form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(72),
    ]),
  });

  protected async onLogin() {
    if (this.form.invalid) {
      return;
    }

    try {
      await this.authService.login({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
      });

      this.router.navigate([this.routes.HOME]);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error({ status: error.status, message: error.error.detail });
        await this.toastService.error(error.error.detail);
      }
    }
  }
}
