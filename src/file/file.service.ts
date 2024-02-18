import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { FileDTO } from "../Products/dto/file-product.dto";
import { PrismaClient } from "@prisma/client";



// @Injectable()
// export class FileService {

//     constructor(private readonly prisma: PrismaClient) {}

//     async upload(file: FileDTO, produtoId: number) {

//         const URL = "https://nwbuaecnkykrchusnnef.supabase.co"
//         const Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53YnVhZWNua3lrcmNodXNubmVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzA4MDg3MywiZXhwIjoyMDIyNjU2ODczfQ.-VCEpBxnBqlsUi_0azN6HpI_Ybu747XN1nQwkxh7kCE"
//         const supabase = createClient(URL, Key, {
//             auth: {
//                 persistSession: false,

//             }
//         });

//         const data = await supabase.storage.from("Products").upload(file.originalname, file.buffer, {
//             upsert: true
//         });

//         return data;
//     }
// }



@Injectable()
export class FileService {

    constructor(private readonly prisma: PrismaClient) {}

    async upload(file: FileDTO, produtoId: number) {

        const URL = "https://nwbuaecnkykrchusnnef.supabase.co"
        const Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53YnVhZWNua3lrcmNodXNubmVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzA4MDg3MywiZXhwIjoyMDIyNjU2ODczfQ.-VCEpBxnBqlsUi_0azN6HpI_Ybu747XN1nQwkxh7kCE"
        const supabase = createClient(URL, Key, {
            auth: {
                persistSession: false,
            }
        });

        const  data = await supabase.storage.from("Products").upload(file.originalname, file.buffer, {
            upsert: true
        });


        const path = Key
        const url = `${URL}/storage/v1/object/public/Products/${path}`;

        const image = await this.prisma.imageProduto.create({
            data: {
                url: url,
                produtoId: produtoId
            },
        });

        return image;
    }
}
