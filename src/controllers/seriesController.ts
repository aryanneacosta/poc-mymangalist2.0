import { Request, Response } from "express";
import { findSeries, insertNewSerie, filterSerie } from "../repositories/seriesRepository.js";
import { NewSerie } from "../protocols/series.js";
import { NewSerieSchema } from "../schemas/seriesSchema.js";

async function getSeriesList(req: Request, res: Response) {
    const list = (await findSeries()).rows;
    res.send(list);
}

async function postSeries(req: Request, res: Response) {
    const serie = req.body as NewSerie;
    const { error } = NewSerieSchema.validate(serie);
    if (error) {
        return res.status(400).send({
            message: error.message
        });
    }

    const newSerieAdded = await insertNewSerie(serie);
    res.send(`You added ${newSerieAdded.rowCount} mangas`);
}

async function getSeriesFilter(req: Request, res: Response) {
    const { genre } = req.query;

    if (genre !== 'shounen' && genre !== 'shoujo' && genre !== 'seinen' && genre !== 'josei') {
        return res.status(400).send('Insert a valid manga genre');
    }

    const seriesByGenre = await filterSerie(genre);
    res.send(seriesByGenre.rows);
}

export {
    getSeriesList,
    postSeries,
    getSeriesFilter
}