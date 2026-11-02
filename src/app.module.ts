import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TransacoesModule } from './transacoes/transacoes.module.js';

@Module({
  imports: [
    // Conecta ao container MongoDB local (via Docker Compose) por padrão,
    // ou utiliza a string de conexão do MongoDB Atlas definida em MONGODB_URI
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/controle-financeiro',
    ),
    TransacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
