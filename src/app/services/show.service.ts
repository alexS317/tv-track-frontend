import { inject, Service } from '@angular/core';
import { ApiService } from './api.service';
import { ShowResponse, TvmazeDto } from '../types/show.types';

const SHOWS_ENDPOINT = '/shows';

@Service()
export class ShowService {
  private readonly api = inject(ApiService);

  public async getAllShows(): Promise<ShowResponse[]> {
    return await this.api.get<ShowResponse[]>(SHOWS_ENDPOINT);
  }

  public async getShow(id: string): Promise<ShowResponse> {
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
}
