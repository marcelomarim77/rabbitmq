import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const data = context.switchToRpc().getData();
        Logger.log('Mensagem recebida', this.constructor.name);
        Logger.log(`Processando mensagem: ${JSON.stringify(data)}`, this.constructor.name);
        return next.handle();
    }
}
