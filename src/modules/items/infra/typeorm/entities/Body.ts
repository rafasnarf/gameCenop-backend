import { Player } from 'src/modules/users/infra/typeorm/entities/Player';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TipSex } from './TipSex';

@Entity('tbBody')
export class Body {
  @PrimaryColumn()
  @OneToOne(() => Player, player => player.idBodyPlayer)
  // @JoinColumn({
  //   referencedColumnName: 'idBodyPlayer',
  //   name: 'nomeArquivo',
  // })
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
