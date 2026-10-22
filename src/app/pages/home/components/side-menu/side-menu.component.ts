import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonMenu,
  IonTitle,
  IonToggle,
  IonToolbar,
  ToggleCustomEvent,
} from '@ionic/angular';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [
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
  private readonly themeService = inject(ThemeService);
  protected readonly isDark = this.themeService.isDark;

  protected async onToggle(event: ToggleCustomEvent): Promise<void> {
    await this.themeService.toggleTheme(event);
  }

  protected async onResetToSystemTheme(): Promise<void> {
    await this.themeService.resetToSystemTheme();
  }
}
