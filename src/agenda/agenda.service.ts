import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigAgenda } from './entities/config-agenda.entity';
import { format } from 'date-fns';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(ConfigAgenda)
    private readonly configAgendaRepository: Repository<ConfigAgenda>,
  ) {}

  async criar(createConfigAgendaDto: ConfigAgenda): Promise<ConfigAgenda> {
    const configAgenda = this.configAgendaRepository.create({
      ...createConfigAgendaDto,
      ativoDesde: new Date(createConfigAgendaDto.ativoDesde),
      horarioInicio: format(
        new Date(createConfigAgendaDto.horarioInicio),
        'HH:mm:ss',
      ),
      horarioFim: format(
        new Date(createConfigAgendaDto.horarioFim),
        'HH:mm:ss',
      ),
    });
    return this.configAgendaRepository.save(configAgenda);
  }

  async atualizar(
    id: string,
    configAgenda: Partial<ConfigAgenda>,
  ): Promise<ConfigAgenda> {
    const config = await this.configAgendaRepository.preload({
      id,
      ...configAgenda,
    });
    if (!config) {
      throw new NotFoundException('Configuração não encontrada');
    }
    return this.configAgendaRepository.save(config);
  }

  async buscarTodos(psicologoId?: string): Promise<ConfigAgenda[]> {
    const query =
      this.configAgendaRepository.createQueryBuilder('configAgenda');
    if (psicologoId) {
      query.where('configAgenda.psicologoId = :psicologoId', { psicologoId });
    }
    return query.getMany();
  }

  async buscarPorId(id: string): Promise<ConfigAgenda> {
    const config = await this.configAgendaRepository.findOne({ where: { id } });
    if (!config) {
      throw new NotFoundException('Configuração não encontrada');
    }
    return config;
  }

  async remover(id: string): Promise<void> {
    const config = await this.buscarPorId(id);
    await this.configAgendaRepository.remove(config);
  }

  async getConfigForNext4Weeks(psicologoId: string): Promise<any> {
    const today = new Date();
    const startDate = this.getStartOfWeek(today);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 35);

    const configData = await this.configAgendaRepository
      .createQueryBuilder('config')
      .where('config.psicologoId = :psicologoId', { psicologoId })
      .andWhere('config.ativoDesde BETWEEN :startDate AND :endDate', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
      .getMany();

    return this.organizarConfigPorDia(configData);
  }

  private getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  private organizarConfigPorDia(configData: ConfigAgenda[]): any {
    const diasConfig = {};

    configData.forEach((config) => {
      const date = config.ativoDesde.toISOString().split('T')[0];
      if (!diasConfig[date]) {
        diasConfig[date] = [];
      }
      diasConfig[date].push({
        horarioInicio: config.horarioInicio,
        horarioFim: config.horarioFim,
      });
    });

    return diasConfig;
  }
}
