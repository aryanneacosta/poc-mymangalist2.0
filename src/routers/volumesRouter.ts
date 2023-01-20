import { Router } from "express";
import { getVolumesList, postNewVolume, updateNewVolumeRead, finishedVolume, deletedVolume } from '../controllers/volumesController.js';

const volumeRouter = Router();

volumeRouter.get('/volume', getVolumesList);
volumeRouter.post('/volume', postNewVolume);
volumeRouter.put('/volume', updateNewVolumeRead);
volumeRouter.put('/finish', finishedVolume);
volumeRouter.delete('/volume/:volumeId', deletedVolume);

export { volumeRouter }