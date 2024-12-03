import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfigAgenda } from './entities/config-agenda.entity';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('agenda')
@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post('config')
  async criarConfigAgenda(@Req() req: any, @Body() configAgenda: ConfigAgenda) {
    configAgenda.psicologoId = req.user.id;
    return this.agendaService.criar(configAgenda);
  }

  @Put('config/:id')
  async atualizarConfigAgenda(
    @Param('id') id: string,
    @Body() configAgenda: Partial<ConfigAgenda>,
  ) {
    return this.agendaService.atualizar(id, configAgenda);
  }

  @Get()
  async getConfig(@Req() req: any): Promise<any> {
    return this.agendaService.getConfigForNext4Weeks(req.user.id);
  }

  @Get('config')
  async buscarTodos(@Req() req: any) {
    const psicologoId = req.user.id;
    return this.agendaService.buscarTodos(psicologoId);
  }

  @Get('config/:id')
  async buscarPorId(@Param('id') id: string) {
    return this.agendaService.buscarPorId(id);
  }

  @Delete('config/:id')
  async removerConfigAgenda(@Param('id') id: string) {
    return this.agendaService.remover(id);
  }
}
