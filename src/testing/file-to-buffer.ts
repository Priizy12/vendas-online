import { rejects } from "assert";
import { error } from "console";
import { ReadStream, createReadStream } from "fs";
import { buffer } from "stream/consumers";


export const getFileToBuffer = (filename: string) => {

    const ReadStream = createReadStream(filename);
    const chunks = [];

    return new Promise<{buffer: Buffer, stream: ReadStream}>((resolve, reject) => {

        ReadStream.on('data', chunk => chunks.push(chunk));

        ReadStream.on('error', (error) => reject(error))


        ReadStream.on('close', ()=> {
            resolve({
              buffer: Buffer.concat(chunks) as Buffer,
              stream: ReadStream
            })
        })
    });
 
}