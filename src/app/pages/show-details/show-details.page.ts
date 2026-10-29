import {
  Component,
  computed,
  input,
  viewChildren,
  ElementRef,
  signal,
  afterNextRender,
  OnDestroy,
  linkedSignal,
  inject,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
  IonSegmentView,
  IonSegmentContent,
  SegmentCustomEvent,
  IonButton,
  IonAlert,
} from '@ionic/angular';
import { ShowResponse, TvmazeEpisodeData } from '../../types/show.types';
import { PersonalStatisticsFormComponent } from './components/personal-statistics-form/personal-statistics-form.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';
import { ShowService } from '../../services/show.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { ReadMoreComponent } from './components/read-more/read-more.component';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
  imports: [
    IonAlert,
    IonButton,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonText,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    IonSegmentView,
    IonSegmentContent,
    EpisodeCardComponent,
    PersonalStatisticsFormComponent,
    ReadMoreComponent,
  ],
})
export class ShowDetailsPage implements OnDestroy {
  private readonly router = inject(Router);
  private readonly showService = inject(ShowService);
  public readonly showDetails = input.required<ShowResponse>();
  public readonly showDetailsState = linkedSignal(() => this.showDetails());
  private readonly segmentContents = viewChildren('segmentContent', { read: ElementRef });

  protected readonly seasons = computed(() => {
    const s = this.showDetailsState().tvmazeShowData?.episodes.map(e => e.season);
    return [...new Set(s)]; // Set object automatically stores only unique values
  });
  private readonly currentEpisode = computed(() =>
    this.showDetailsState().tvmazeShowData?.episodes.find(
      e => e.id === this.showDetailsState().currentEpisodeId,
    ),
  );
  private readonly selectedSeason = signal<number | null>(null);
  protected readonly currentSeason = computed(
    () => this.selectedSeason() ?? this.currentEpisode()?.season ?? this.seasons()[0],
  );
  private readonly listHeightsBySeason = signal<Record<number, number>>({});
  protected readonly currentSeasonListHeight = computed(
    () => this.listHeightsBySeason()[this.currentSeason()] ?? 0,
  );
  private resizeObserver?: ResizeObserver;

  public deleteAlertButtons = [
    { text: 'Cancel', role: 'cancel' },
    { text: 'Confirm', role: 'confirm' },
  ];

  constructor() {
    afterNextRender(() => {
      this.resizeObserver = new ResizeObserver(entries => {
        this.listHeightsBySeason.update(current => {
          const next = { ...current };
          for (const entry of entries) {
            // Ensures unique entries as values of existing keys will be overwritten
            next[Number(entry.target.id)] = entry.contentRect.height;
          }
          return next;
        });
      });

      this.segmentContents().forEach(el => this.resizeObserver?.observe(el.nativeElement));
    });
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  protected filterSeasonEpisodes(season: number): TvmazeEpisodeData[] {
    return this.showDetailsState().tvmazeShowData?.episodes.filter(e => e.season === season) ?? [];
  }

  protected onChangeSegment(event: SegmentCustomEvent): void {
    const value = event.detail.value as number;
    this.selectedSeason.set(value);
  }

  protected onFormSaved(show: ShowResponse): void {
    this.showDetailsState.update(current => ({
      ...current,
      ...show,
      tvmazeShowData: this.showDetails().tvmazeShowData,
    }));
  }

  protected async onDelete(event: CustomEvent): Promise<void> {
    if (event.detail.role === 'confirm') {
      await this.showService.deleteShow(this.showDetailsState().id);
      this.router.navigate([AppRoutes.HOME]);
    }
  }
}
