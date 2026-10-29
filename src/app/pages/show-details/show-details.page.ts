import { Component, computed, input, linkedSignal, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonText,
  IonToolbar,
  IonButton,
  IonAlert,
} from '@ionic/angular';
import { ShowResponse } from '../../types/show.types';
import { PersonalStatisticsFormComponent } from './components/personal-statistics-form/personal-statistics-form.component';
import { ShowService } from '../../services/show.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { SeasonOverviewListComponent } from './components/season-overview-list/season-overview-list.component';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
  imports: [
    IonAlert,
    IonButton,
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
    PersonalStatisticsFormComponent,
    ReadMoreComponent,
    SeasonOverviewListComponent,
  ],
})
export class ShowDetailsPage {
  private readonly router = inject(Router);
  private readonly showService = inject(ShowService);
  public readonly showDetails = input.required<ShowResponse>();
  public readonly showDetailsState = linkedSignal(() => this.showDetails());
  public readonly deleteAlertButtons = [
    { text: 'Cancel', role: 'cancel' },
    { text: 'Confirm', role: 'confirm' },
  ];
  protected readonly seasons = computed(() => {
    const s = this.showDetailsState().tvmazeShowData?.episodes.map(e => e.season);
    return [...new Set(s)]; // Set object automatically stores only unique values
  });

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
