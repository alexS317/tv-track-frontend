import { Component, inject, output, signal } from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  SearchbarCustomEvent,
  IonThumbnail,
  IonText,
  IonButton,
  IonIcon,
} from '@ionic/angular';
import { CreateShowRequest, ShowResponse } from '../../../../types/show.types';
import { ShowService } from '../../../../services/show.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../../services/toast.service';
import { ImageFallbackComponent } from '../../../../components/image-fallback/image-fallback.component';

@Component({
  selector: 'app-show-search',
  templateUrl: './show-search.component.html',
  styleUrls: ['./show-search.component.scss'],
  imports: [
    IonIcon,
    IonButton,
    IonText,
    IonItem,
    IonList,
    IonSearchbar,
    IonItem,
    IonLabel,
    IonThumbnail,
    ImageFallbackComponent,
  ],
})
export class ShowSearchComponent {
  private readonly toastService = inject(ToastService);
  private readonly showService = inject(ShowService);
  protected readonly searchResults = signal<CreateShowRequest[]>([]);
  protected readonly isFocused = signal<boolean>(false);
  public readonly added = output<ShowResponse>();

  protected async onSearch(event: SearchbarCustomEvent): Promise<void> {
    const query = event.detail.value?.trim().toLowerCase();
    const response = await this.showService.searchShows(query ?? '');
    this.searchResults.set(response);
  }

  protected async onAdd(request: CreateShowRequest): Promise<void> {
    const imageLink = request.coverImage?.split('medium_portrait/')[1];

    try {
      const response = await this.showService.addShow({ ...request, coverImage: imageLink });
      this.added.emit(response);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error({ status: error.status, message: error.error.detail });
        await this.toastService.error(error.error.detail);
      }
    }
  }
}
