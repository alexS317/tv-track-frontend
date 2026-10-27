import { Component, input } from '@angular/core';
import { TvmazeEpisodeData } from '../../../../types/show.types';
import { IonText } from '@ionic/angular';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
  imports: [IonText, NgOptimizedImage],
})
export class EpisodeCardComponent {
  public episode = input.required<TvmazeEpisodeData>();
  public currentlyWatching = input<boolean>(false);
}
