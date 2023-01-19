export type SerieEntity = {
    id: number,
    name: string,
    author: string,
    genre: string,
    image: string
}

export type NewSerie = Omit<SerieEntity, "id">