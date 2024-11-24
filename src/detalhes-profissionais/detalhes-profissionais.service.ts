import { Injectable } from '@nestjs/common';
import { CreateDetalhesProfissionaisDto } from './dto/create-detalhes-profissionais.dto';
import { UpdateDetalhesProfissionaisDto } from './dto/update-detalhes-profissionais.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalhesProfissionais } from './entities/detalhes-profissionais.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalhesProfissionaisService {
  constructor(
    @InjectRepository(DetalhesProfissionais)
    private readonly detalhesProfissionaisRepository: Repository<DetalhesProfissionais>,
  ) {}

  create(createDetalhesProfissionaisDto: CreateDetalhesProfissionaisDto) {
    const entity = this.detalhesProfissionaisRepository.create(
      createDetalhesProfissionaisDto,);
    return this.detalhesProfissionaisRepository.save(entity);
  }

  findAll() {
    return this.detalhesProfissionaisRepository.find();
  }

  findOne(id: string) {
    return this.detalhesProfissionaisRepository.findOne({where: {id : id.toString()}});;
  }

  update(
    id: string,
    updateDetalhesProfissionaiDto: UpdateDetalhesProfissionaisDto,
  ) {
    return this.detalhesProfissionaisRepository.update(
      id,
      updateDetalhesProfissionaiDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} detalhesProfissionais`;
  }
}