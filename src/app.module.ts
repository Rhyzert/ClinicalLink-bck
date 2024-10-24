import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultaModule } from './consulta/consulta.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { EspecialistaModule } from './especialista/especialista.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { UserModule } from './user/user.module';
//import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Especialista } from './especialista/entities/especialista.entity'; // Importe sua entidade Especialista
import { EspecializacaoModule } from './especializacao/especializacao.module';
import { Especializacao } from './especializacao/entities/especializacao.entity';
import { Pagamento } from './pagamento/entities/pagamento.entity';
import { Consulta } from './consulta/entities/consulta.entity';
import { ContaBancariaModule } from './conta-bancaria/conta-bancaria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'kadugay',
      database: 'ClinicalLink',
      entities: [User,Especialista,Especializacao,Pagamento,Consulta], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User]), 
    UserModule, EspecializacaoModule, EspecialistaModule, PagamentoModule, ConsultaModule, ContaBancariaModule
  ],
})
export class AppModule {}
