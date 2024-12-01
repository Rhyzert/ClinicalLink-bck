import { PartialType } from '@nestjs/swagger';
import { CreateCidadeEstadoDto } from './create-cidade-estado.dto';

export class UpdateCidadeEstadoDto extends PartialType(CreateCidadeEstadoDto) {}
