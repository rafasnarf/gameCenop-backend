import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from '../../../../items/infra/typeorm/entities/Item';
import { Player } from '../entities/Player';

@Entity('tbPlayerItens')
export class PlayerItems {
  @PrimaryColumn()
  // @OneToOne(() => Player, idPlayer => idPlayer.matricula)
  // @JoinColumn({
  //   referencedColumnName: 'matricula',
  //   name: 'idPlayer',
  // })
  idPlayer: string;

  // @OneToOne(() => Item, idItem => idItem.id)
  // @JoinColumn({
  //   referencedColumnName: 'id',
  //   name: 'idItem',
  // })
  @Column()
  idItem: string;

  @CreateDateColumn({ type: 'timestamp', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'NOW()' })
  updatedAt: Date;
}
