import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Transacao } from './schemas/transacao.schema.js';
import { TransacoesService } from './transacoes.service.js';

describe('TransacoesService', () => {
  let service: TransacoesService;

  const mockTransacoes = [
    {
      descricao: 'Salário Mensal',
      valor: 3500,
      tipo: 'receita',
      categoria: 'Renda',
      consumoConsciente: true,
    },
    {
      descricao: 'Conta de Luz',
      valor: 180,
      tipo: 'despesa',
      categoria: 'Moradia',
      consumoConsciente: true,
    },
    {
      descricao: 'Compra de Roupas por Impulso',
      valor: 320,
      tipo: 'despesa',
      categoria: 'Lazer',
      consumoConsciente: false,
    },
  ];

  const mockModel = {
    find: () => ({
      exec: async () => mockTransacoes,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransacoesService,
        {
          provide: getModelToken(Transacao.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<TransacoesService>(TransacoesService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve consolidar o histórico e calcular saldoTotal, totalDespesas e totalGastoImpulso corretamente', async () => {
    const resultado = await service.findAll();

    expect(resultado.historico).toHaveLength(3);
    expect(resultado.metricas).toEqual({
      saldoTotal: 3000,
      totalDespesas: 500,
      totalGastoImpulso: 320,
    });
  });
});
