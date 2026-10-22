import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
  IonInputPasswordToggle,
  IonButton,
} from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

function passwordMatches(control: AbstractControl): ValidationErrors | null {
  const password = control.parent?.get('password')?.value;
  return control.value === password ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
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
  ],
})
export class RegisterPage {
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);
  protected readonly form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(72),
    ]),
    passwordConfirmation: new FormControl<string>('', [Validators.required, passwordMatches]),
  });

  protected async onRegister() {
    // Check in case the password was changed again after entering a valid confirmation
    this.form.controls.passwordConfirmation.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    try {
      await this.authService.register({
        name: this.form.value.name ?? '',
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
        passwordConfirmation: this.form.value.passwordConfirmation ?? '',
      });
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error({ status: error.status, message: error.error.detail });
        await this.toastService.error(error.error.detail);
      }
    }
  }
}
