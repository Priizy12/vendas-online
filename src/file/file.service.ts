import { BadRequestException, Injectable } from "@nestjs/common";
import { DeleteObjectCommand, PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { Credentials } from "aws-sdk";


@Injectable()
export class FileService {

    AWS_BUCKET_S3 = process.env.AWS_BUCKET_S3
    s3: S3Client;


    constructor() {
        const config: S3ClientConfig = {
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.ACESS_PUBLIC_AWS_S3,
                secretAccessKey: process.env.SECRET_ACESS_KEY_AWS_S3
            } as Credentials
        }
        this.s3 = new S3Client(config);
    }


    async uploadfiles(file: Buffer, fileName: string) {
        const params = {
            Bucket: this.AWS_BUCKET_S3,
            Key: fileName,
            Body: file,
            ContentType: 'image/png'
        };

        try {
            const response = await this.s3.send(new PutObjectCommand(params));
            return response;

        } catch (error) {
            console.log(error)
            throw new BadRequestException("não foi possivel realizar o Upload da imagem do produto, tente novamente")
        }
    }


    async deleteFile(fileName: string) {
        const params = {
            Bucket: this.AWS_BUCKET_S3,
            Key: fileName 
        };
        try {
            const response = await this.s3.send(new DeleteObjectCommand(params));
            return response;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("não foi possivel deletar foto do produto, tente novamente.")
        }
    }
}


