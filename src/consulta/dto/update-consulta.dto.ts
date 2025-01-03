import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateConsultaDto } from './create-consulta.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateConsultaDto extends PartialType(CreateConsultaDto) {
  @ApiProperty({
    description: 'ID',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
