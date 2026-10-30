import { Component, computed, inject, input, linkedSignal, signal, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonPopover,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ShowResponse } from '../../types/show.types';
import { ShowCardComponent } from './components/show-card/show-card.component';
import { ShowSearchComponent } from './components/show-search/show-search.component';
import { ShowStatus } from '../../constants/show-status.enum';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { UserPreferences } from '../../constants/user-preferences.enum';

type SortOption = keyof ShowResponse;
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonItem,
    IonLabel,
    IonList,
    IonPopover,
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
export class HomePage implements OnInit {
  private readonly userPreferencesService = inject(UserPreferencesService);
  protected readonly shows = input.required<ShowResponse[]>();
  private readonly showsState = linkedSignal(() => this.shows());
  private readonly filteredShows = linkedSignal(() => this.showsState());

  protected readonly sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Last updated', value: 'updatedAt' },
    { label: 'Title', value: 'title' },
    { label: 'Save date', value: 'createdAt' },
  ];
  protected readonly sortOption = signal<SortOption>('updatedAt');
  protected readonly sortDirection = signal<SortDirection>('asc');
  protected readonly sortedShows = computed(() => {
    const shows = [...this.filteredShows()];

    return shows.sort((a, b) => {
      const valueA = a[this.sortOption()];
      const valueB = b[this.sortOption()];

      let result = 0;

      if (
        this.sortOption() === 'createdAt' ||
        this.sortOption() === 'updatedAt' ||
        this.sortOption() === 'startedWatching' ||
        this.sortOption() === 'finishedWatching'
      ) {
        result = new Date(valueA as string).getTime() - new Date(valueB as string).getTime();
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        result = valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        result = valueA - valueB;
      }

      return result * (this.sortDirection() === 'asc' ? 1 : -1);
    });
  });

  async ngOnInit() {
    await this.loadPreferences();
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

  protected async onSetSortMode(value: SortOption): Promise<void> {
    if (this.sortOption() === value) {
      this.sortDirection.update(s => (s === 'asc' ? 'desc' : 'asc'));
      await this.userPreferencesService.set(UserPreferences.SORT_DIRECTION, this.sortDirection());
    } else {
      this.sortOption.set(value);
      await this.userPreferencesService.set(UserPreferences.SORT_OPTION, this.sortOption());
    }
  }

  private async loadPreferences(): Promise<void> {
    const option = await this.userPreferencesService.get(UserPreferences.SORT_OPTION);
    const direction = await this.userPreferencesService.get(UserPreferences.SORT_DIRECTION);

    if (option) {
      this.sortOption.set(option as SortOption);
    }
    if (direction) {
      this.sortDirection.set(direction as SortDirection);
    }
  }
}
