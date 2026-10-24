import { inject, Service } from '@angular/core';
import { ApiService } from './api.service';
import { ShowResponse } from '../types/show.types';

const SHOWS_ENDPOINT = '/shows';

@Service()
export class ShowService {
  private readonly api = inject(ApiService);

  public async getAllShows(): Promise<ShowResponse[]> {
    return await this.api.get<ShowResponse[]>(SHOWS_ENDPOINT);
  }

  public async getShow(id: string): Promise<ShowResponse> {
    return await this.api.get(`${SHOWS_ENDPOINT}/${id}`);
  }
}
