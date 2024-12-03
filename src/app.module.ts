import { Module } from '@nestjs/common';
import { ConsultaModule } from './consulta/consulta.module';
//import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoModule } from './servico/servico.module';
import { UniversidadeModule } from './universidade/universidade.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ConfigModule } from '@nestjs/config';
import { DetalhesProfissionaisModule } from './detalhes-profissionais/detalhes-profissionais.module';
import { UsuarioServicoModule } from './usuario-servico/usuario-servico.module';
import { AuthModule } from './auth/auth.module';
import { AgendaModule } from './agenda/agenda.module';
import { CidadeEstadoModule } from './cidade-estado/cidade-estado.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AvaliacaoModule,
    ConsultaModule,
    ServicoModule,
    UniversidadeModule,
    SupervisorModule,
    UsuarioModule,
    DetalhesProfissionaisModule,
    UsuarioServicoModule,
    AuthModule,
    AgendaModule,
    CidadeEstadoModule,
  ],
})
export class AppModule {}
