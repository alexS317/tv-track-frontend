import { Component, computed, inject, input, OnInit, output } from '@angular/core';
import {
  DatetimeCustomEvent,
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
import { ShowResponse, UpdateShowRequest } from '../../../../types/show.types';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShowStatus } from '../../../../constants/show-status.enum';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { InputWrapperComponent } from '../input-wrapper/input-wrapper.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../../services/toast.service';
import { ShowService } from '../../../../services/show.service';
import { debounceTime } from 'rxjs';

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
  private readonly toastService = inject(ToastService);
  private readonly showService = inject(ShowService);
  public readonly showDetails = input.required<ShowResponse>();
  public readonly saved = output<ShowResponse>();

  protected readonly form = new FormGroup({
    personalRating: new FormControl<number | null>(null, [Validators.min(1), Validators.max(10)]),
    startedWatching: new FormControl<string | null>(null),
    finishedWatching: new FormControl<string | null>(null),
    currentEpisodeId: new FormControl<number | null>(null),
    status: new FormControl<ShowStatus>(ShowStatus.PLANNED, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected readonly statusOptions = ShowStatus;
  private readonly showStatus = toSignal(this.form.controls.status.valueChanges);
  protected readonly statusColor = computed(() => {
    switch (this.showStatus()) {
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

  constructor() {
    // Auto-save form
    this.form.valueChanges
      .pipe(debounceTime(100), takeUntilDestroyed())
      .subscribe(() => this.onSave());
  }

  ngOnInit() {
    this.form.reset({
      personalRating: this.showDetails().personalRating ?? null,
      startedWatching: this.showDetails().startedWatching ?? null,
      finishedWatching: this.showDetails().finishedWatching ?? null,
      currentEpisodeId: this.showDetails().currentEpisodeId ?? null,
      status: this.showDetails().status,
    });
  }

  // Clear button on ion date picker automatically sets value to undefined, should be null instead
  protected onDateChange(event: DatetimeCustomEvent, control: FormControl<string | null>): void {
    if (event.detail.value === undefined) {
      control.setValue(null);
    }
  }

  protected async onSave(): Promise<void> {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    // Only add fields that were actually changed through user input
    const changes: Record<string, unknown> = {};
    for (const [key, control] of Object.entries(this.form.controls)) {
      if (control.dirty) {
        changes[key] = control.value;
      }
    }
    if (this.form.controls.currentEpisodeId.dirty) {
      const currentEpisode = this.showDetails().tvmazeShowData?.episodes.find(
        e => e.id === this.form.controls.currentEpisodeId.value,
      );
      changes['currentSeason'] = currentEpisode?.season ?? null;
      changes['currentEpisode'] = currentEpisode?.number ?? null;
    }

    // Started and finished date are always sent for date validation on backend
    const request: UpdateShowRequest = {
      status: this.form.controls.status.value,
      startedWatching:
        this.form.controls.startedWatching.value ?? this.showDetails().startedWatching,
      finishedWatching:
        this.form.controls.finishedWatching.value ?? this.showDetails().finishedWatching,
      ...(changes as Partial<UpdateShowRequest>),
    };

    try {
      const response = await this.showService.updateShow(this.showDetails().id, request);

      this.saved.emit(response);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error({ status: error.status, message: error.error.detail });
        await this.toastService.error(error.error.detail);
      }
    }
  }
}
