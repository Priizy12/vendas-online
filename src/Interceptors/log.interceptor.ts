import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { tap } from 'rxjs'
import { Observable } from "rxjs";
export class LogInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(tap(()=>{

            const request = context.switchToHttp().getRequest()

            const dt = Date.now()
            console.log(`URL ${request.url}`)
            console.log(`essa execução levou' + ${Date.now() - dt} milissegundos `)
        }))
    }

}