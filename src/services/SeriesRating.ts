import axios from 'axios';

import config from '../config';
import { setAccessMetrics } from './AccessCount';

export const getSeriesData = async (seriesId: string) => {
  const seriesUrl = `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${config.apiKey}`;
  const seriesResponse = await axios.get(seriesUrl);
  const seriesData = seriesResponse.data;
  if (seriesData && seriesData.seasons && seriesData.seasons.length) {
    return await getEpisodesRating(seriesData, seriesId);
  }
  throw new Error('Series data not found');
};

const getEpisodesRating = async (data, id: string) => {
  await setAccessMetrics(data.name);
  const seasonRating = [];
  for (
    let i = data.seasons[0].season_number;
    i <= data.seasons[data.seasons.length - 1].season_number;
    i++
  ) {
    const seasonResponse = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=${config.apiKey}`
    );

    const seasonData = seasonResponse.data;
    if (seasonData && seasonData.episodes && seasonData.episodes.length) {
      for (let j = 0; j < seasonData.episodes.length; j++) {
        seasonRating.push({
          episodeName: seasonData.episodes[j].name,
          averageVotes: seasonData.episodes[j].vote_average,
          season: i,
        });
      }
    } else {
      throw new Error('Episodes data not found');
    }
  }
  seasonRating.sort((a, b) => {
    return a.averageVotes > b.averageVotes ? -1 : 1;
  });
  return seasonRating.slice(0, 20);
};
