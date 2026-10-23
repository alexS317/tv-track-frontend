import { Component, inject, input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
} from '@ionic/angular';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { ShowResponse } from '../../types/show.types';
import { ShowCardComponent } from './components/show-card/show-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonMenuButton,
    SideMenuComponent,
    ShowCardComponent,
  ],
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly shows = input.required<ShowResponse[]>();

  protected async onLogout(): Promise<void> {
    await this.authService.logout();

    this.router.navigate([AppRoutes.LOGIN]);
  }
}
