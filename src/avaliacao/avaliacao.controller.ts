import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('avaliacao')
@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  create(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
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
  updateAvaliacao(
    @Param('id') id: string,
    @Body() avaliacaoUpdate: CreateAvaliacaoDto,
  ) {
    return this.avaliacaoService.updateAvaliacao(id, avaliacaoUpdate);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avaliacaoService.delete(id);
  }
}
