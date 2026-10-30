import { Component, inject, output } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  ToggleCustomEvent,
} from '@ionic/angular';
import { ThemeService } from '../../../../services/theme.service';
import { ShowStatus } from '../../../../constants/show-status.enum';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { AppRoutes } from '../../../../app.routes';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [
    IonText,
    IonLabel,
    IonItem,
    IonList,
    IonButton,
    IonButtons,
    IonFooter,
    IonToggle,
    IonContent,
    IonTitle,
    IonIcon,
    IonHeader,
    IonMenu,
    IonToolbar,
    IonMenu,
  ],
})
export class SideMenuComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);
  protected readonly isDark = this.themeService.isDark;
  protected readonly menuFilterItems = [
    { icon: 'heart', label: 'My Shows', status: null },
    { icon: 'time', label: ShowStatus.PLANNED.toLowerCase(), status: ShowStatus.PLANNED },
    { icon: 'refresh', label: ShowStatus.WATCHING.toLowerCase(), status: ShowStatus.WATCHING },
    {
      icon: 'checkmark-circle',
      label: ShowStatus.FINISHED.toLowerCase(),
      status: ShowStatus.FINISHED,
    },
  ];
  protected readonly menuNavItems = [
    { icon: 'log-out', label: 'Log out', method: () => this.onLogout() },
  ];
  public filtered = output<ShowStatus | null>();

  protected async onToggle(event: ToggleCustomEvent): Promise<void> {
    await this.themeService.toggleTheme(event);
  }

  protected async onResetToSystemTheme(): Promise<void> {
    await this.themeService.resetToSystemTheme();
  }

  protected onFilter(status: ShowStatus | null): void {
    this.filtered.emit(status);
  }

  protected async onLogout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
