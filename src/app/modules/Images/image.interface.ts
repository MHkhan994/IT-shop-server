export interface TImage {
    image: string,
    height: number,
    width: number,
    size: number,
    extension: string,
    name: string,
    image_type: string,
    public_id: string
}

export interface TUploadImage {
    image_type: string,
    imageFile: File
}