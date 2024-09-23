import { model, Schema } from "mongoose";
import { TImage } from "./image.interface";

const ImageSchema = new Schema<TImage>({
    height: {
        type: Number,
        required: [true, 'Image height is required']
    },
    width: {
        type: Number,
        required: [true, 'Image width is required']
    },
    image: {
        type: String,
        required: [true, 'Image url is required']
    },
    extension: {
        type: String,
        required: [true, 'Image extension is required']
    },
    name: {
        type: String,
        required: [true, 'Image name is required']
    },
    size: {
        type: Number,
        required: [true, 'Image size is required']
    },
})

export const Image = model<TImage>('Image', ImageSchema)