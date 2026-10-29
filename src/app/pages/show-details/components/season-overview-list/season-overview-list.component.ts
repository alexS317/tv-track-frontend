import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChildren,
  OnDestroy,
} from '@angular/core';
import {
  IonSegment,
  IonSegmentView,
  IonSegmentContent,
  IonSegmentButton,
  SegmentCustomEvent,
  IonLabel,
} from '@ionic/angular';
import { EpisodeCardComponent } from '../episode-card/episode-card.component';
import { ShowResponse, TvmazeEpisodeData } from '../../../../types/show.types';

@Component({
  selector: 'app-season-overview-list',
  templateUrl: './season-overview-list.component.html',
  styleUrls: ['./season-overview-list.component.scss'],
  imports: [
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonSegmentView,
    IonSegmentContent,
    EpisodeCardComponent,
  ],
})
export class SeasonOverviewListComponent implements OnDestroy {
  public showDetails = input.required<ShowResponse>();
  public seasons = input.required<number[]>();
  private readonly segmentContents = viewChildren('segmentContent', { read: ElementRef });

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

  protected onChangeSegment(event: SegmentCustomEvent): void {
    const value = event.detail.value as number;
    this.selectedSeason.set(value);
  }
}
