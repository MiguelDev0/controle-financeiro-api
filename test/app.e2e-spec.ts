import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('Controle Financeiro API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('API de Controle Financeiro Pessoal (ODS 1 e ODS 12) ativa!');
  });

  it('/transacoes (POST e GET)', async () => {
    const novaDespesa = {
      descricao: 'Conta de Luz',
      valor: 150.0,
      tipo: 'despesa',
      categoria: 'Moradia',
      consumoConsciente: true,
    };

    await request(app.getHttpServer())
      .post('/transacoes')
      .send(novaDespesa)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/transacoes')
      .expect(200);

    expect(response.body).toHaveProperty('historico');
    expect(Array.isArray(response.body.historico)).toBe(true);
    expect(response.body).toHaveProperty('metricas');
    expect(response.body.metricas).toHaveProperty('saldoTotal');
    expect(response.body.metricas).toHaveProperty('totalDespesas');
    expect(response.body.metricas).toHaveProperty('totalGastoImpulso');
  });

  afterEach(async () => {
    await app.close();
  });
});
