import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async create(createAvaliacaoDto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const avaliacao = this.avaliacaoRepository.create(createAvaliacaoDto);
    return this.avaliacaoRepository.save(avaliacao);
  }

  async findAll(): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.find({ relations: ['consulta'] });
  }

  async findOne(id: string): Promise<Avaliacao> {
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: { id },
      relations: ['consulta'],
    });

    if (!avaliacao) {
      throw new NotFoundException(`Avaliação com ID ${id} não encontrada.`);
    }

    return avaliacao;
  }

  async update(
    id: string,
    updateAvaliacaoDto: UpdateAvaliacaoDto,
  ): Promise<Avaliacao> {
    const avaliacao = await this.findOne(id);

    Object.assign(avaliacao, updateAvaliacaoDto);

    return this.avaliacaoRepository.save(avaliacao);
  }

  async remove(id: string): Promise<void> {
    const avaliacao = await this.findOne(id);
    await this.avaliacaoRepository.remove(avaliacao);
  }
}
