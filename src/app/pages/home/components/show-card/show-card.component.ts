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
  IonRouterLink,
} from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ShowStatus } from '../../../../constants/show-status.enum';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../../app.routes';
import { ImageFallbackComponent } from '../../../../components/image-fallback/image-fallback.component';

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
    RouterLink,
    IonRouterLink,
    ImageFallbackComponent,
  ],
})
export class ShowCardComponent {
  protected readonly routes = AppRoutes;
  public readonly show = input.required<ShowResponse>();
  protected readonly statusColor = computed(() => {
    switch (this.show().status) {
      case ShowStatus.PLANNED:
        return 'danger';
      case ShowStatus.WATCHING:
        return 'primary';
      case ShowStatus.FINISHED:
        return 'success';
      default:
        return 'medium';
    }
  });
}
