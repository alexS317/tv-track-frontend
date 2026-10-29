import { inject, Service } from '@angular/core';
import { ApiService } from './api.service';
import { ShowResponse, TvmazeDto, UpdateShowRequest } from '../types/show.types';
import { AppRoutes } from '../app.routes';

const SHOWS_ENDPOINT = `/${AppRoutes.SHOWS}`;

@Service()
export class ShowService {
  private readonly api = inject(ApiService);

  public async getAllShows(): Promise<ShowResponse[]> {
    return await this.api.get<ShowResponse[]>(SHOWS_ENDPOINT);
  }

  public async getShow(id: number): Promise<ShowResponse> {
    const show = await this.api.get<ShowResponse>(`${SHOWS_ENDPOINT}/${id}`);

    const tvmazeDto = await this.api.get<TvmazeDto>(
      `https://api.tvmaze.com/shows/${show.tvmazeId}?embed[]=episodes`,
      false,
    );
    show.tvmazeShowData = {
      language: tvmazeDto.language,
      genres: tvmazeDto.genres,
      premiered: tvmazeDto.premiered,
      ended: tvmazeDto.ended,
      status: tvmazeDto.status,
      averageRating: tvmazeDto.rating.average,
      officialSite: tvmazeDto.officialSite,
      channel: tvmazeDto.network?.name ?? tvmazeDto.webChannel?.name,
      summary: tvmazeDto.summary,
      episodes: tvmazeDto._embedded.episodes.map(e => ({
        id: e.id,
        name: e.name,
        season: e.season,
        number: e.number,
        runtime: e.runtime,
        image: e.image?.medium,
        summary: e.summary,
      })),
    };

    return show;
  }

  public async updateShow(id: number, body: UpdateShowRequest): Promise<ShowResponse> {
    return await this.api.patch<ShowResponse>(`${SHOWS_ENDPOINT}/${id}`, body);
  }

  public async deleteShow(id: number): Promise<void> {
    return await this.api.delete<void>(`${SHOWS_ENDPOINT}/${id}`);
  }
}
