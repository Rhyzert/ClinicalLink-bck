import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('consulta')
@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Post()
  create(@Body() consulta: CreateConsultaDto) {
    return this.consultaService.createConsulta(consulta);
  }

  @Get()
  findAll() {
    return this.consultaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaService.findOne(id);
  }

  @Get(':id/consultaPsicologo')
  findOneProfissional(@Param('id') id: string) {
    return this.consultaService.findConsultaByProfissional(id);
  }
}
