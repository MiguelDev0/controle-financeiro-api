import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransacaoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  valor: number;

  @IsString()
  @IsIn(['receita', 'despesa'], {
    message: 'O tipo deve ser apenas "receita" ou "despesa"',
  })
  tipo: 'receita' | 'despesa';

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsBoolean()
  consumoConsciente: boolean;
}
