import { Request, Response } from "express";
import { findVolumes, findSerie, insertNewVolume, findVolume, updateVolume, finishVolume, deleteVolume } from '../repositories/volumesRepository.js';
import { NewVolume, NewVolumeToDB, UpdateVolume, UpdateVolumeToDB, FisinhedVolume, FisinhedVolumeToDB } from "../protocols/volumes.js";
import { NewVolumeSchema, UpdateVolumeSchema, FinishedVolumeSchema } from "../schemas/volumesSchema.js";

async function getVolumesList(req: Request, res: Response) {
    const list = (await findVolumes()).rows;
    res.send(list);
}

async function postNewVolume(req: Request, res: Response) {
    const volume = req.body as NewVolume;
    
    const { error } = NewVolumeSchema.validate(volume);
    if (error) {
        return res.status(400).send({
            message: error.message
        });
    }

    const serieExist = volume.serie_name;
    const verifySerieId = ((await findSerie(serieExist)).rows[0]).id;
    if (!verifySerieId) {
        return res.status(400).send('Please, insert a serie that already exists in your series added');
    }
    
    const newVolume: NewVolumeToDB = {
        serie_id: verifySerieId,
        number: volume.number,
        image: volume.image,
        total_chapters: volume.total_chapters
    }

    const newVolumeAdded = await insertNewVolume(newVolume);
    res.send(`You added ${newVolumeAdded.rowCount} new volume`);
}

async function updateNewVolumeRead(req: Request, res: Response) {
    const volume = req.body as UpdateVolume;

    const { error } = UpdateVolumeSchema.validate(volume);
    if (error) {
        return res.status(400).send({
            message: error.message
        });
    }

    const serieExist = volume.serie_name;
    const verifySerieId = ((await findSerie(serieExist)).rows[0]).id;
    if (!verifySerieId) {
        return res.status(400).send('Please insert a serie that already exists in your series added');
    }

    const volumeExist = volume.number;
    const verifyVolumeId = ((await findVolume(verifySerieId, volumeExist)).rows[0].id);
    if(!verifyVolumeId) {
        return res.status(400).send('You can only update a volume that you already inserted');
    }

    const newUpdate: UpdateVolumeToDB = {
        id: verifyVolumeId,
        status: volume.status,
        read_chapters: volume.read_chapters
    }

    const newVolumeUpdated = await updateVolume(newUpdate);
    res.send(`You updated ${newVolumeUpdated.rowCount} new volume`);
}

async function finishedVolume(req: Request, res: Response) {
    const avaliation = req.body as FisinhedVolume;

    const { error } = FinishedVolumeSchema.validate(avaliation);
    if (error) {
        return res.status(400).send({
            message: error.message
        });
    }

    const serieExist = avaliation.serie_name;
    const verifySerieId = ((await findSerie(serieExist)).rows[0]).id;
    if (!verifySerieId) {
        return res.status(400).send('Please insert a serie that already exists in your series added');
    }

    const volumeExist = avaliation.number;
    const verifyVolumeId = ((await findVolume(verifySerieId, volumeExist)).rows[0].id);
    if(!verifyVolumeId) {
        return res.status(400).send('You can only update a volume that you already inserted');
    }

    const newFinished: FisinhedVolumeToDB = {
        id: verifyVolumeId,
        status: avaliation.status,
        read_chapters: avaliation.read_chapters,
        rating: avaliation.rating,
        description: avaliation.description
    }

    const newFinishedVolume = await finishVolume(newFinished);
    res.send(`You finished ${newFinishedVolume.rowCount} volume`);
}

async function deletedVolume(req: Request, res: Response) {
    const volumeId = req.params.volumeId;

    const volumeDeleted = await deleteVolume(Number(volumeId));
    if (volumeDeleted.rowCount === 0) {
        return res.send(`Insert a valid manga id`);
    }

    res.send(`${volumeDeleted.rowCount} manga deleted`);
}

export {
    getVolumesList,
    postNewVolume,
    updateNewVolumeRead,
    finishedVolume,
    deletedVolume
}