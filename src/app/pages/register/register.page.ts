import { Component } from '@angular/core';
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

  protected onRegister() {
    // Check in case the password was changed again after entering a valid confirmation
    this.form.controls.passwordConfirmation.updateValueAndValidity();

    if (this.form.invalid) {
      console.log('Invalid form.');
      return;
    }

    console.log(this.form.value);
  }
}
