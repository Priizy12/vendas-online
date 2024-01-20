import { Test, TestingModule } from "@nestjs/testing"
import { FileService } from "./file.service"
import { GetFile } from "../testing/file-upload.mock";




describe('FileService', () => {

    let fileService: FileService

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FileService
            ]
        }).compile();


        fileService = module.get<FileService>(FileService)
    });

    describe('File Method', () => {
        
        test('upload test', async () => {
            const photo = await GetFile()
            const filename = 'photo-test.png'

            fileService.upload(photo, filename)
        })

    })
    

})