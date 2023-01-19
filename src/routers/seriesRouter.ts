import { Router } from "express";
import { getSeriesList, postSeries, getSeriesFilter } from "../controllers/seriesController.js";

const serieRouter = Router();

serieRouter.get('/series', getSeriesList);
serieRouter.post('/series', postSeries);
serieRouter.get('/genre', getSeriesFilter);

export { serieRouter }