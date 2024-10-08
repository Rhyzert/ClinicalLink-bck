import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Especialista } from './entities/especialista.entity';
import { EspecialistaRepository } from './especialista.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EspecialistaService {
    constructor(
        @InjectRepository(Especialista)
        private especialistaRepository: EspecialistaRepository,
    ) {}

    async findAll(): Promise<Especialista[]> {
        return this.especialistaRepository.findAll();
    }

    async findOne(id: number): Promise<Especialista> {
      return this.especialistaRepository.findOne(id)
    }

    async createEspecialista(especialista :Especialista){
      this.especialistaRepository.createEspecialista(especialista)
    }
}
