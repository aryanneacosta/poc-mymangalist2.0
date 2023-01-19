export type VolumeEntity = {
    id: number,
    serie_id: number,
    number: number,
    status: string,
    image: string,
    read_chapters: number,
    total_chapters: number
}

export type NewVolume = Omit<VolumeEntity, "id" & "serie_id" & "status" & "read_chapters">

export type UpdateVolume = Omit<VolumeEntity, "id" & "serie_id" & "image" & "total_chapters">