import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCidadeEstadoDto } from './dto/create-cidade-estado.dto';
import { UpdateCidadeEstadoDto } from './dto/update-cidade-estado.dto';
import { CidadeEstado } from './entities/cidade-estado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CidadeEstadoService {
  constructor(
    @InjectRepository(CidadeEstado)
    private readonly cidadeestadoRepository: Repository<CidadeEstado>,
  ) {}


  create(createCidadeEstadoDto: CreateCidadeEstadoDto) {
    const entity = this.cidadeestadoRepository.create(
      createCidadeEstadoDto,);
    return this.cidadeestadoRepository.save(entity);
  }
  findAll() {
    return this.cidadeestadoRepository.find();
  }

  findOne(id: number) {
    return this.cidadeestadoRepository.findOne({where: {id : id}});;
  }

  update(id: number, updateCidadeEstadoDto: UpdateCidadeEstadoDto) {
    return this.cidadeestadoRepository.update(id, updateCidadeEstadoDto);
  }

  remove(id: number) {
    this.cidadeestadoRepository.delete(id);
  }
}
