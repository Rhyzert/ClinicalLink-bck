import { Usuario } from 'src/usuario/entities/usuario.entity';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cidadeestado')
export class CidadeEstado {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cidade'})
  cidade: string;

  @Column({ name: 'estado', nullable: true })
  estado: string;

  @Column({ type: 'text', nullable: true })
  uf: string;

  
  @OneToMany(() => Usuario, (usuario) => usuario.cidadeEstado)
  usuarios: Usuario[];

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
