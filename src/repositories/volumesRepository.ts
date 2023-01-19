import { QueryResult } from "pg";
import { connection } from '../database/database.js';
import { VolumeEntity, NewVolume, UpdateVolume } from "../protocols/volumes.js";

async function findVolumes(): Promise<QueryResult<VolumeEntity>> {
    return connection.query('SELECT * FROM volumes ORDER BY id;');
}

async function findSerie(serie: string) {
    return connection.query('SELECT id FROM series WHERE name = $1;', [serie]);
}

async function insertNewVolume(serie_id: number, volume: NewVolume): Promise<QueryResult> {
    return connection.query('INSERT INTO volumes (serie_id, number, image, total_chapters) VALUES ($1, $2, $3, $4);', [serie_id, volume.number, volume.image, volume.total_chapters]);
}

async function findVolume(serie_id: number, volume: UpdateVolume) {
    return connection.query('SELECT id FROM volumes WHERE serie_id = $1 && number = $2;', [serie_id, volume.number]);
}

async function updateVolume(volume_id: number, volume: UpdateVolume): Promise<QueryResult> {
    return connection.query('UPDATE volumes SET status = $1, read_chapters = $2 WHERE id = $3;' [volume.status, volume.read_chapters, volume_id])
}

export {
    findVolumes,
    findSerie,
    insertNewVolume,
    findVolume,
    updateVolume
}