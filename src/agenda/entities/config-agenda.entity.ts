import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('config_agenda')
export class ConfigAgenda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  psicologoId: string;

  @Column({ type: 'date' })
  ativoDesde: Date;

  @Column({ type: 'time' })
  horarioInicio: string;

  @Column({ type: 'time' })
  horarioFim: string;

  @Column({ type: 'json' })
  diasSemana: number[];

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
