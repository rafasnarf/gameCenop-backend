import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tbBeard')
export class Beard {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  nomeArquivo: string;

  @Column({ type: 'varchar' })
  descricao: string;

  @CreateDateColumn({ type: 'timestamp', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'NOW()' })
  updatedAt: Date;
}
