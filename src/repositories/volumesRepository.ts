import { QueryResult } from "pg";
import { connection } from '../database/database.js';
import { VolumeEntity, NewVolumeToDB, UpdateVolumeToDB, FisinhedVolumeToDB } from "../protocols/volumes.js";

async function findVolumes(): Promise<QueryResult<VolumeEntity>> {
    return connection.query('SELECT * FROM volumes ORDER BY id;');
}

async function findSerie(serie: string) {
    return connection.query('SELECT id FROM series WHERE name = $1;', [serie]);
}

async function insertNewVolume(volume: NewVolumeToDB): Promise<QueryResult> {
    return connection.query('INSERT INTO volumes (serie_id, number, image, total_chapters) VALUES ($1, $2, $3, $4);', [volume.serie_id, volume.number, volume.image, volume.total_chapters]);
}

async function findVolume(serie_id: number, volume: number) {
    return connection.query('SELECT id FROM volumes WHERE serie_id = $1 AND number = $2;', [serie_id, volume]);
}

async function updateVolume(volume: UpdateVolumeToDB): Promise<QueryResult> {
    return connection.query('UPDATE volumes SET status = $1, read_chapters = $2 WHERE id = $3;', [volume.status, volume.read_chapters, volume.id]);
}

async function finishVolume(volume: FisinhedVolumeToDB): Promise<QueryResult> {
    return connection.query('UPDATE volumes SET status = $1, read_chapters = $2, rating = $3, description = $4 WHERE id = $5;', [volume.status, volume.read_chapters, volume.rating, volume.description, volume.id]);
}

async function deleteVolume(id: number): Promise<QueryResult> {
    return connection.query('DELETE FROM volumes WHERE id = $1;', [id]);
}

export {
    findVolumes,
    findSerie,
    insertNewVolume,
    findVolume,
    updateVolume,
    finishVolume,
    deleteVolume
}