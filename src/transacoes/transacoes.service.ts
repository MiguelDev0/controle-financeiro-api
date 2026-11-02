import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransacaoDto } from './dto/create-transacao.dto.js';
import { Transacao, TransacaoDocument } from './schemas/transacao.schema.js';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<TransacaoDocument>,
  ) {}

  async create(createTransacaoDto: CreateTransacaoDto): Promise<Transacao> {
    if (
      createTransacaoDto.tipo !== 'receita' &&
      createTransacaoDto.tipo !== 'despesa'
    ) {
      throw new BadRequestException(
        'O campo tipo deve aceitar apenas os valores "receita" ou "despesa".',
      );
    }

    const novaTransacao = new this.transacaoModel(createTransacaoDto);
    return novaTransacao.save();
  }

  async findAll() {
    const historico = await this.transacaoModel.find().exec();

    let totalReceitas = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    for (const item of historico) {
      const valor = Number(item.valor) || 0;

      if (item.tipo === 'receita') {
        totalReceitas += valor;
      } else if (item.tipo === 'despesa') {
        totalDespesas += valor;

        if (item.consumoConsciente === false) {
          totalGastoImpulso += valor;
        }
      }
    }

    const saldoTotal = Number((totalReceitas - totalDespesas).toFixed(2));
    totalDespesas = Number(totalDespesas.toFixed(2));
    totalGastoImpulso = Number(totalGastoImpulso.toFixed(2));

    return {
      historico,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastoImpulso,
      },
    };
  }
}
