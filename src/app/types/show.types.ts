import { ShowStatus } from '../constants/show-status.enum';

export interface ShowResponse {
  id: number;
  tvmazeId: number;
  title: string;
  coverImage?: string;
  status: ShowStatus;
  personalRating?: number;
  startedWatching?: string;
  finishedWatching?: string;
  currentEpisodeId?: number;
  currentSeason?: number;
  currentEpisode?: number;
  createdAt: string;
  updatedAt: string;
  tvmazeShowData?: TvmazeShowData;
}

export interface TvmazeShowData {
  language: string;
  genres: string[];
  premiered?: string;
  ended?: string;
  status: string;
  averageRating?: number;
  officialSite?: string;
  channel?: string;
  summary?: string;
  episodes: TvmazeEpisodeData[];
}

export interface TvmazeEpisodeData {
  id: number;
  name: string;
  season: number;
  number: number;
  runtime?: number;
  image?: string;
  summary?: string;
}

export interface TvmazeDto {
  language: string;
  genres: string[];
  premiered?: string;
  ended?: string;
  status: string;
  rating: { average?: number };
  officialSite?: string;
  network?: { name?: string };
  webChannel?: { name?: string };
  summary?: string;
  _embedded: {
    episodes: {
      id: number;
      name: string;
      season: number;
      number: number;
      runtime?: number;
      image?: { medium?: string };
      summary?: string;
    }[];
  };
}
