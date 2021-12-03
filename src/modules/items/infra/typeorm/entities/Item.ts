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
import { TipItem } from './TipItem';
import { TipSubItem } from './TipSubItem';

@Entity('tbItem')
export class Item {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 45 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  nomeArquivo: string;

  @OneToOne(() => TipSex, idTipSex => idTipSex.id)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'idTipSex',
  })
  idTipSex: number;

  @OneToOne(() => TipItem, idTip => idTip.id)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'idTip',
  })
  idTip: number;

  @OneToOne(() => TipSubItem, idSubTipo => idSubTipo.id)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'idSubTipo',
  })
  idSubTipo: number;

  @Column({ type: 'double', precision: 20, scale: 2 })
  valor: number;

  @CreateDateColumn({ type: 'timestamp', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'NOW()' })
  updatedAt: Date;
}
