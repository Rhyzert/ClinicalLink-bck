import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalhes_profissionais')
export class DetalhesProfissionais {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Usuario, (usuario) => usuario.detalhesProfissionais, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'registro_profissional', length: 50 })
  registroProfissional: string;

  @Column({ length: 15, nullable: true })
  telefone: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ name: 'local_trabalho', length: 255, nullable: true })
  localTrabalho: string;

  @Column({ name: 'local_trabalho_lat', type: 'double', nullable: true })
  localTrabalhoLat: number;

  @Column({ name: 'local_trabalho_long', type: 'double', nullable: true })
  localTrabalhoLong: number;

  @Column({ name: 'tempo_sessao', type: 'int', nullable: true })
  tempoSessao: number;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
