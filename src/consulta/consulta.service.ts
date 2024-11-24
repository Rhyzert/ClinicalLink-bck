import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Repository } from 'typeorm';
import {CreateConsultaDto} from 'src/consulta/dto/create-consulta.dto'
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Injectable()
export class ConsultaService {
    constructor(
        @InjectRepository(Consulta)
        private readonly consultaRepository: Repository<Consulta>,
        private readonly usuarioService: UsuarioService
    ) {}

    async createConsulta(consulta: CreateConsultaDto): Promise<Consulta> 
    {
        return this.consultaRepository.create(consulta);
    }

    async findOne(id: string) 
    {
        return this.consultaRepository.findOne({where: {id : id.toString()}});
    }

    async findAll() 
    {
        return this.consultaRepository.find();
    }

    async findList()
    {
        return this.consultaRepository.find();
    }

    async findTipo(tipoUsuario: number): Promise<Consulta[]> 
    {
        return this.consultaRepository
        .createQueryBuilder('consulta')
        .innerJoinAndSelect('consulta.usuario', 'usuario') 
        .where('usuario.tipoUsuario = :tipoUsuario', { tipoUsuario })  
        .getMany();
    }

    async findConsultaByProfissional(id: string) {
        return this.consultaRepository
            .createQueryBuilder('consulta')
            .innerJoinAndSelect('consulta.profissional', 'profissional') 
            .innerJoinAndSelect('consulta.paciente', 'paciente')         
            .where('profissional.id = :idUsuario', { idUsuario: id })    
            .getMany();
    }
    updateConsulta(id: string, updateAvaliacao: UpdateConsultaDto) 
    {
        return this.consultaRepository.update(id, updateAvaliacao);
      }
    
    async delete(id: string): Promise<void> 
    {
        this.consultaRepository.delete(id);
      
    }
    
}
