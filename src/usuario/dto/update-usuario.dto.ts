import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

}
