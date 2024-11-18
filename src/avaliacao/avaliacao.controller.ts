import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { Avaliacao } from './entities/avaliacao.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('avaliacao')
@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  create(@Body() createAvaliacaoDto: Avaliacao) {
    return this.avaliacaoService.create(createAvaliacaoDto);
  }

  @Get()
  findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avaliacaoService.findOne(id);
  }

  @Patch(':id')
  updateAvaliacao(@Param('id') id: string, @Body() avaliacaoUpdate: Avaliacao) {
    return this.avaliacaoService.updateAvaliacao(id, avaliacaoUpdate);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avaliacaoService.delete(id);
  }
}
