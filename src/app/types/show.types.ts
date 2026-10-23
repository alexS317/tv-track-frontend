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
}
