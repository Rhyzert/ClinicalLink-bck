import { DetalhesProfissionais } from 'src/detalhes-profissionais/entities/detalhes-profissionais.entity';
import { TipoUsuario } from 'src/enums/tipo-usuario.enum';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Consulta } from 'src/consulta/entities/consulta.entity';
import { Universidade } from 'src/universidade/entities/universidade.entity';
import * as bcrypt from 'bcrypt';
import { Genero } from 'src/enums/genero.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuario')
export class Usuario {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  sobrenome: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 14 })
  cpf: string;

  @Column()
  password: string;

  @Column({
    name: 'tipo_usuario',
    type: 'enum',
    enum: TipoUsuario,
    default: TipoUsuario.PACIENTE,
  })
  tipoUsuario: TipoUsuario;

  @Column({
    type: 'enum',
    enum: Genero,
  })
  genero: Genero;

  @Column({ name: 'data_nascimento', type: 'timestamp' })
  dataNascimento: Date;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @OneToOne(() => DetalhesProfissionais, (detalhes) => detalhes.usuario)
  detalhesProfissionais: DetalhesProfissionais;

  @ManyToOne(() => Universidade, (universidade) => universidade.estagiarios, {
    nullable: true,
  })
  universidade: Universidade;

  agenda: any;

  @OneToMany(() => Consulta, (consulta) => consulta.paciente)
  consultas: Consulta[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
