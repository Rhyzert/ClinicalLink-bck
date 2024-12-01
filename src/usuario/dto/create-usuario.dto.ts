import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoUsuario } from 'src/enums/tipo-usuario.enum';
import { Genero } from 'src/enums/genero.enum';
import { CreateDetalhesProfissionaisDto } from 'src/detalhes-profissionais/dto/create-detalhes-profissionais.dto';
import { CidadeEstado } from 'src/cidade-estado/entities/cidade-estado.entity';
import { CreateCidadeEstadoDto } from 'src/cidade-estado/dto/create-cidade-estado.dto';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'Silva' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Sobrenome do usuário', example: 'Silva' })
  @IsNotEmpty()
  @IsString()
  sobrenome: string;

  @ApiProperty({
    description: 'CPF do usuário',
  })
  @IsNotEmpty()
  @Length(14)
  cpf: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Tipo do usuário',
    example: 'PACIENTE',
    enum: TipoUsuario,
  })
  @IsNotEmpty()
  @IsEnum(TipoUsuario)
  tipoUsuario: TipoUsuario;

  @ApiProperty({
    description: 'Gênero do usuário',
    example: 'MASCULINO',
    enum: Genero,
  })
  @IsNotEmpty()
  @IsEnum(Genero)
  genero: Genero;

  @ApiProperty({
    description: 'Data de nascimento',
    example: '2024-11-20T14:30:00Z',
  })
  @IsNotEmpty()
  @IsString()
  dataNascimento: string;

  @ApiProperty({ type: CreateCidadeEstadoDto, required: false})
  @IsNotEmpty()
  cidadeestado: CidadeEstado;

  @ApiProperty({ type: CreateDetalhesProfissionaisDto, required: false })
  @IsOptional()
  detalhesProfissionais: CreateDetalhesProfissionaisDto;
}
