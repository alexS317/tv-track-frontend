import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ShowService } from '../services/show.service';
import { ShowResponse } from '../types/show.types';

export const showDetailsResolver: ResolveFn<ShowResponse> = route => {
  const showService = inject(ShowService);
  const showId = route.paramMap.get('id');

  if (!showId) {
    throw new Error('Show ID is required.');
  }

  return showService.getShow(Number(showId));
};
