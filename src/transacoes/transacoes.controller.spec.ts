import { Test, TestingModule } from '@nestjs/testing';
import { TransacoesController } from './transacoes.controller.js';
import { TransacoesService } from './transacoes.service.js';

describe('TransacoesController', () => {
  let controller: TransacoesController;

  const mockService = {
    create: async (dto: any) => ({ _id: '1', ...dto }),
    findAll: async () => ({
      historico: [],
      metricas: {
        saldoTotal: 0,
        totalDespesas: 0,
        totalGastoImpulso: 0,
      },
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacoesController],
      providers: [
        {
          provide: TransacoesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TransacoesController>(TransacoesController);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar estrutura consolidada no GET /transacoes', async () => {
    const res = await controller.findAll();
    expect(res).toHaveProperty('historico');
    expect(res).toHaveProperty('metricas');
    expect(res.metricas).toEqual({
      saldoTotal: 0,
      totalDespesas: 0,
      totalGastoImpulso: 0,
    });
  });
});
