import { Component, computed, input } from '@angular/core';
import { ShowResponse } from '../../../../types/show.types';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonText,
} from '@ionic/angular';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ShowStatus } from '../../../../constants/show-status.enum';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
  imports: [
    IonText,
    IonIcon,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    DatePipe,
    NgOptimizedImage,
  ],
})
export class ShowCardComponent {
  public readonly show = input.required<ShowResponse>();
  protected readonly statusColor = computed(() => {
    switch (this.show().status) {
      case ShowStatus.PLANNED:
        return 'danger';
        break;
      case ShowStatus.WATCHING:
        return 'primary';
        break;
      case ShowStatus.FINISHED:
        return 'success';
        break;
      default:
        return 'medium';
        break;
    }
  });
}
