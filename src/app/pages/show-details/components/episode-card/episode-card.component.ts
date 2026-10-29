import { Component, input } from '@angular/core';
import { TvmazeEpisodeData } from '../../../../types/show.types';
import { IonText } from '@ionic/angular';
import { ImageFallbackComponent } from '../../../../components/image-fallback/image-fallback.component';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
  imports: [IonText, ImageFallbackComponent],
})
export class EpisodeCardComponent {
  public episode = input.required<TvmazeEpisodeData>();
  public currentlyWatching = input<boolean>(false);
}
