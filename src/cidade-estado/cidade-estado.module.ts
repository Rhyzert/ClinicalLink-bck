import { Module } from '@nestjs/common';
import { CidadeEstadoService } from './cidade-estado.service';
import { CidadeEstadoController } from './cidade-estado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadeEstado } from './entities/cidade-estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CidadeEstado])],
  controllers: [CidadeEstadoController],
  providers: [CidadeEstadoService],
  exports: [CidadeEstadoService],
})
export class CidadeEstadoModule {}
