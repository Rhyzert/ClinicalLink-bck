import { Injectable } from '@nestjs/common';
import { CreateDetalhesProfissionaisDto } from './dto/create-detalhes-profissionais.dto';
import { UpdateDetalhesProfissionaisDto } from './dto/update-detalhes-profissionais.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalhesProfissionais } from './entities/detalhes-profissionais.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

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
  async findDetalhesByIdUsuario(idUsuario: string): Promise<DetalhesProfissionais[]> 
  {
      return this.detalhesProfissionaisRepository
      .createQueryBuilder('detalhesprofissionais')
      .innerJoinAndSelect('detalhesprofissionais.usuario', 'usuario') 
      .where('usuario.id = :idUsuario', { idUsuario })  
      .getMany();
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
    this.detalhesProfissionaisRepository.delete(id);;
  }
}