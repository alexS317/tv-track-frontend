import { Component, computed, input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonDatetime,
  IonDatetimeButton,
  IonIcon,
  IonInput,
  IonPopover,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular';
import { ShowResponse } from '../../../../types/show.types';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShowStatus } from '../../../../constants/show-status.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { InputWrapperComponent } from '../input-wrapper/input-wrapper.component';

@Component({
  selector: 'app-personal-statistics-form',
  templateUrl: './personal-statistics-form.component.html',
  styleUrls: ['./personal-statistics-form.component.scss'],
  imports: [
    IonPopover,
    IonDatetimeButton,
    IonIcon,
    IonDatetime,
    IonInput,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    DatePipe,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
    InputWrapperComponent,
  ],
})
export class PersonalStatisticsFormComponent implements OnInit {
  public readonly showDetails = input.required<ShowResponse>();

  protected readonly form = new FormGroup({
    personalRating: new FormControl<number | null>(null, [Validators.min(1), Validators.max(10)]),
    startedWatching: new FormControl<string | null>(null),
    finishedWatching: new FormControl<string | null>(null),
    status: new FormControl<ShowStatus>(ShowStatus.PLANNED, [Validators.required]),
  });

  protected readonly statusOptions = ShowStatus;
  private readonly showStatus = toSignal(this.form.controls.status.valueChanges);
  protected readonly statusColor = computed(() => {
    switch (this.showStatus()) {
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

  ngOnInit() {
    this.form.reset({
      personalRating: this.showDetails().personalRating ?? null,
      startedWatching: this.showDetails().startedWatching ?? null,
      finishedWatching: this.showDetails().finishedWatching ?? null,
      status: this.showDetails().status,
    });
  }
}
