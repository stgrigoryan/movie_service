import { Router } from 'express';

import { getSeriesData } from '../services/SeriesRating';
import { getAccessMetrics } from '../services/AccessCount';

const router = Router();

router.get('/topEpisodes/:SeriesId', async (req, res, _next) => {
  try {
    if (!req.params.SeriesId || isNaN(parseInt(req.params.SeriesId))) {
      return res.status(422).json({ message: 'Invalid series Id' });
    }
    const response = await getSeriesData(req.params.SeriesId);
    res.status(200).json({ episodes: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `No series data found or something went wrong` });
  }
});

router.get('/analytics/popularSeries', async (_req, res, _next) => {
  try {
    const data = await getAccessMetrics();
    res.status(200).json({ series: data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `No popular series data found or something went wrong` });
  }
});

export default router;
