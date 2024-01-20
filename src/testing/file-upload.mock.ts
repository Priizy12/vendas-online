import { join } from "path"
import { getFileToBuffer } from "./file-to-buffer"
import { buffer } from 'stream/consumers'

export const GetFile = async () => {

    const {buffer, stream } = await getFileToBuffer(join(__dirname, 'photo.png'))


    const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'photo.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: 1024 * 1024 * 8,
        stream,
        destination: '',
        filename: 'file--name',
        path: 'file-path',
        buffer
    }

    return file;
}