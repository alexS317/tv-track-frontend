import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonText,
  IonToolbar,
} from '@ionic/angular';
import { ShowResponse } from '../../types/show.types';
import { PersonalStatisticsComponent } from './components/personal-statistics/personal-statistics.component';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
  imports: [
    IonText,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    PersonalStatisticsComponent,
  ],
})
export class ShowDetailsPage {
  public readonly showDetails = input.required<ShowResponse>();
}
