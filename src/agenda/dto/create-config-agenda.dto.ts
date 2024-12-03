import {
  IsNotEmpty,
  IsUUID,
  IsArray,
  IsDateString,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateConfigAgendaDto {
  @IsUUID()
  psicologoId: string;

  @IsDateString()
  ativoDesde: string;

  @IsNotEmpty()
  horarioInicio: string;

  @IsNotEmpty()
  horarioFim: string;

  @IsArray()
  @ArrayNotEmpty()
  diasSemana: number[];
}
