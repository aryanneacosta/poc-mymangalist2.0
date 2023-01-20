export type VolumeEntity = {
    id: number,
    serie_id: number,
    serie_name: string,
    number: number,
    status: string,
    image: string,
    read_chapters: number,
    total_chapters: number,
    rating: string,
    description: string
}

export type NewVolume = Omit<VolumeEntity, "id" | "serie_id" | "status" | "read_chapters" | "rating" | "description">

export type NewVolumeToDB = Omit<VolumeEntity, "id" | "serie_name" | "status" | "read_chapters" | "rating" | "description">

export type UpdateVolume = Omit<VolumeEntity, "id" | "serie_id" | "image" | "total_chapters" | "rating" | "description">

export type UpdateVolumeToDB = Omit<VolumeEntity, "serie_id" |"serie_name" | "number" | "image" | "total_chapters" | "rating" | "description">

export type FisinhedVolume = Omit<VolumeEntity, "id" | "serie_id" | "image" | "total_chapters">

export type FisinhedVolumeToDB = Omit<VolumeEntity, "serie_id" | "serie_name" | "number" | "image" | "total_chapters">