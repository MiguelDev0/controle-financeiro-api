import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API de Controle Financeiro Pessoal (ODS 1 e ODS 12) ativa!';
  }
}
