import {
  Component,
  computed,
  input,
  viewChildren,
  ElementRef,
  signal,
  afterNextRender,
  OnDestroy,
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
} from '@ionic/angular';
import { ShowResponse, TvmazeEpisodeData } from '../../types/show.types';
import { PersonalStatisticsFormComponent } from './components/personal-statistics-form/personal-statistics-form.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
  imports: [
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
  ],
})
export class ShowDetailsPage implements OnDestroy {
  public readonly showDetails = input.required<ShowResponse>();
  private readonly segmentContents = viewChildren('segmentContent', { read: ElementRef });
  protected readonly seasons = computed(() => {
    const s = this.showDetails().tvmazeShowData?.episodes.map(e => e.season);
    return [...new Set(s)]; // Set object automatically stores only unique values
  });
  private readonly currentEpisode = computed(() =>
    this.showDetails().tvmazeShowData?.episodes.find(
      e => e.id === this.showDetails().currentEpisodeId,
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
    return this.showDetails().tvmazeShowData?.episodes.filter(e => e.season === season) ?? [];
  }

  protected onChangeSegment(event: SegmentCustomEvent) {
    const value = event.detail.value as number;
    this.selectedSeason.set(value);
  }
}
