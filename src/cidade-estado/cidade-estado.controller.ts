import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CidadeEstadoService } from './cidade-estado.service';
import { CreateCidadeEstadoDto } from './dto/create-cidade-estado.dto';
import { UpdateCidadeEstadoDto } from './dto/update-cidade-estado.dto';

@Controller('cidade-estado')
export class CidadeEstadoController {
  constructor(private readonly cidadeEstadoService: CidadeEstadoService) {}

  @Post()
  create(@Body() createCidadeEstadoDto: CreateCidadeEstadoDto) {
    return this.cidadeEstadoService.create(createCidadeEstadoDto);
  }

  @Get()
  findAll() {
    return this.cidadeEstadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadeEstadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCidadeEstadoDto: UpdateCidadeEstadoDto) {
    return this.cidadeEstadoService.update(id, updateCidadeEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cidadeEstadoService.remove(+id);
  }
}
