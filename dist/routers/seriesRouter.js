import { Router } from "express";
import { getSeriesList, postSeries } from "../controllers/seriesController.js";
var serieRouter = Router();
serieRouter.get('/', getSeriesList);
serieRouter.post('/', postSeries);
export { serieRouter };
