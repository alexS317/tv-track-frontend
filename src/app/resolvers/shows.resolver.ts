import { ResolveFn } from '@angular/router';
import { ShowResponse } from '../types/show.types';
import { inject } from '@angular/core';
import { ShowService } from '../services/show.service';

export const showsResolver: ResolveFn<ShowResponse[]> = () => {
  const showService = inject(ShowService);

  return showService.getAllShows();
};
