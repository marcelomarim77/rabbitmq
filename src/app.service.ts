import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async processCatMessage(data: any) {
        // Lógica para processar a mensagem recebida
        // Exemplo: salvar no banco, validar, etc.
        return { 
            processed: true,
            data
        };
    }
}
