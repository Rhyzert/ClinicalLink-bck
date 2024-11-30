import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsuarioServicoService } from './usuario-servico.service';
import { CreateUsuarioServicoDto } from './dto/create-usuario-servico.dto';
import { UpdateUsuarioServicoDto } from './dto/update-usuario-servico.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('usuario-servico')
@Controller('usuario-servico')
export class UsuarioServicoController {
  constructor(private readonly usuarioServicoService: UsuarioServicoService) {}

  @Post()
  create(@Body() createUsuarioServicoDto: CreateUsuarioServicoDto) {
    return this.usuarioServicoService.create(createUsuarioServicoDto);
  }

  @Get()
  findAll() {
    return this.usuarioServicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioServicoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioServicoDto: UpdateUsuarioServicoDto,
  ) {
    return this.usuarioServicoService.update(id, updateUsuarioServicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioServicoService.remove(id);
  }
}
