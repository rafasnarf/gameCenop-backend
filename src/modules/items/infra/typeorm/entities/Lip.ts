import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TipSex } from './TipSex';

@Entity('tbLip')
export class Lip {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  nomeArquivo: string;

  @OneToOne(() => TipSex, idTipSex => idTipSex.id)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'idTipSex',
  })
  idTipSex: number;

  @Column({ type: 'varchar' })
  descricao: string;

  @CreateDateColumn({ type: 'timestamp', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'NOW()' })
  updatedAt: Date;
}
