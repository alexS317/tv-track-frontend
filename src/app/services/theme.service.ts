import { effect, inject, Service, signal } from '@angular/core';
import { UserPreferencesService } from './user-preferences.service';
import { ToggleCustomEvent } from '@ionic/angular';

@Service()
export class ThemeService {
  private readonly DARK_MODE_KEY = 'darkMode';

  private readonly userPreferencesService = inject(UserPreferencesService);
  private readonly themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private readonly hasStoredPreference = signal<boolean>(false);

  private readonly _isDark = signal<boolean>(false);
  public readonly isDark = this._isDark.asReadonly();

  constructor() {
    this.themeMediaQuery.addEventListener('change', e => this.applySystemTheme(e));

    effect(() => document.documentElement.classList.toggle('ion-palette-dark', this._isDark()));
  }

  public async initialize(): Promise<void> {
    try {
      const stored = JSON.parse(
        (await this.userPreferencesService.get(this.DARK_MODE_KEY)) ?? 'null',
      );
      this.hasStoredPreference.set(stored !== null);

      this._isDark.set(stored ?? this.themeMediaQuery.matches);
    } catch (error) {
      console.error('Failed to load theme preference.', error);
      this._isDark.set(this.themeMediaQuery.matches);
    }
  }

  public async toggleTheme(event: ToggleCustomEvent): Promise<void> {
    const checked = event.detail.checked;

    try {
      await this.userPreferencesService.set(this.DARK_MODE_KEY, JSON.stringify(checked));
      this.hasStoredPreference.set(true);
      this._isDark.set(checked);
    } catch (error) {
      console.error('Failed to save theme preference.', error);
    }
  }

  public async resetToSystemTheme(): Promise<void> {
    try {
      await this.userPreferencesService.remove(this.DARK_MODE_KEY);
      this.hasStoredPreference.set(false);
      this._isDark.set(this.themeMediaQuery.matches);
    } catch (error) {
      console.error('Failed to reset theme preference.', error);
    }
  }

  // Match the system settings if the user hasn't stored a theme preference
  private applySystemTheme(event: MediaQueryListEvent): void {
    if (!this.hasStoredPreference()) {
      this._isDark.set(event.matches);
    }
  }
}
