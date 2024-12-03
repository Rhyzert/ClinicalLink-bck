import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { DetalhesProfissionaisModule } from 'src/detalhes-profissionais/detalhes-profissionais.module';
import { AgendaModule } from 'src/agenda/agenda.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    DetalhesProfissionaisModule,
    AgendaModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
