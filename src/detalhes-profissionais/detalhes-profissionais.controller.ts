import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetalhesProfissionaisService } from './detalhes-profissionais.service';
import { CreateDetalhesProfissionaisDto } from './dto/create-detalhes-profissionais.dto';
import { UpdateDetalhesProfissionaisDto } from './dto/update-detalhes-profissionais.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('detalhes-profissionais')
@Controller('detalhes-profissionais')
export class DetalhesProfissionaisController {
  constructor(
    private readonly detalhesProfissionaisService: DetalhesProfissionaisService,
  ) {}

  @Post()
  create(
    @Body() createDetalhesProfissionaisDto: CreateDetalhesProfissionaisDto,
  ) {
    return this.detalhesProfissionaisService.create(
      createDetalhesProfissionaisDto,);
  }

  @Get()
  findAll() {
    return this.detalhesProfissionaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalhesProfissionaisService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetalhesProfissionaisDto: UpdateDetalhesProfissionaisDto,
  ) {
    return this.detalhesProfissionaisService.update(
      id,
      updateDetalhesProfissionaisDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalhesProfissionaisService.remove(+id);
  }
}
