import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { FileDTO } from "../Products/dto/file-product.dto";
import { PrismaClient } from "@prisma/client";



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
        })

        const data = await supabase.storage.from("Products").upload(file.originalname, file.buffer, {
            upsert: true
        })


        const imageUrl = `${URL}/storage/v1/object/public/Products/${file.originalname}`;
        await this.prisma.imagemProduto.create({
            data: {
                url: imageUrl,
                produtoId: Number(produtoId)        
            }
        })


        return data;
    }
}