import { Component, inject, input, linkedSignal } from '@angular/core';
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
import { ShowSearchComponent } from './components/show-search/show-search.component';
import { ShowStatus } from '../../constants/show-status.enum';

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
    ShowSearchComponent,
  ],
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  protected readonly shows = input.required<ShowResponse[]>();
  protected readonly showsState = linkedSignal(() => this.shows());
  protected readonly filteredShows = linkedSignal(() => this.showsState());

  protected async onLogout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate([AppRoutes.LOGIN]);
  }

  protected onShowAdded(show: ShowResponse): void {
    this.showsState.update(current => [...current, show]);
  }

  protected onFilterShows(status: ShowStatus | null): void {
    if (status) {
      this.filteredShows.set(this.showsState().filter(shows => shows.status === status));
    } else {
      this.filteredShows.set(this.showsState());
    }
  }
}
