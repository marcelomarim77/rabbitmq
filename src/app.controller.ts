import { Controller, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { Interceptor } from './interceptors/interceptor';

@Controller()
@UseInterceptors(Interceptor)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern('message')
    async processarMensagem(data: any, @Ctx() context: RmqContext) {
        // Sua lógica para processar a mensagem
        try {
            const result = await this.appService.processCatMessage(data);

            if (result.processed) {
                const channel = context.getChannelRef();
                const originalMsg = context.getMessage();
                channel.ack(originalMsg); // Reconhece manualmente
                return {
                    received: true,
                    data
                };
            }
            else {
                throw new Error('Mensagem não processada');
            }
        } catch (error) {
            console.error('Erro ao processar a mensagem:', error);
        }
    }
}
