import { Component, effect, inject, OnInit, signal, OnDestroy } from '@angular/core';
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
import { UserPreferencesService } from '../../../../services/user-preferences.service';

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
export class SideMenuComponent implements OnInit, OnDestroy {
  private readonly DARK_MODE = 'darkMode';
  private readonly userPreferencesService = inject(UserPreferencesService);
  private readonly themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private readonly hasStoredPreference = signal(false);
  protected readonly isDark = signal(false);

  constructor() {
    effect(() => document.documentElement.classList.toggle('ion-palette-dark', this.isDark()));
  }

  async ngOnInit(): Promise<void> {
    const stored = JSON.parse((await this.userPreferencesService.get(this.DARK_MODE)) ?? 'null');
    this.hasStoredPreference.set(stored !== null);

    this.isDark.set(stored ?? this.themeMediaQuery.matches);

    this.themeMediaQuery.addEventListener('change', this.onSystemChange);
  }

  ngOnDestroy(): void {
    this.themeMediaQuery.removeEventListener('change', this.onSystemChange);
  }

  protected async onToggle(event: ToggleCustomEvent): Promise<void> {
    const checked = event.detail.checked;
    this.isDark.set(checked);
    await this.userPreferencesService.set(this.DARK_MODE, JSON.stringify(checked));
  }

  protected async onResetToSystemTheme(): Promise<void> {
    await this.userPreferencesService.remove(this.DARK_MODE);
    this.hasStoredPreference.set(false);
    this.isDark.set(this.themeMediaQuery.matches);
  }

  // Match the system settings if the user hasn't stored a theme preference
  private onSystemChange(event: MediaQueryListEvent): void {
    if (!this.hasStoredPreference()) {
      this.isDark.set(event.matches);
    }
  }
}
