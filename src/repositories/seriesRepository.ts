import { QueryResult } from "pg";
import { connection } from '../database/database.js';
import { SerieEntity, NewSerie } from "../protocols/series.js";

async function findSeries(): Promise<QueryResult<SerieEntity>> {
    return connection.query('SELECT * FROM series ORDER BY id;');
}

async function insertNewSerie(serie: NewSerie): Promise<QueryResult> {
    return connection.query('INSERT INTO series (name, author, genre, image) VALUES ($1, $2, $3, $4);', [serie.name, serie.author, serie.genre, serie.image]);
}

async function filterSerie(genre: string) {
    return connection.query('SELECT * FROM series WHERE genre = $1;', [genre]);
}

export {
    findSeries,
    insertNewSerie,
    filterSerie
}