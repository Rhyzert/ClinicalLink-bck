import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCidadeEstadoDto {
   
  @ApiProperty({ description: 'Nome da cidade' }) 
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty({ description: 'Nome completo estado' })
  @IsString()
  @IsOptional()
  estado?: string;


  @ApiProperty({ description: 'UF do estado' })
  @IsString()
  @IsOptional()
  uf?: string;
}
