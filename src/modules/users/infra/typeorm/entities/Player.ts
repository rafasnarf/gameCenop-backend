import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Body } from '../../../../items/infra/typeorm/entities/Body';
import { Hair } from '../../../../items/infra/typeorm/entities/Hair';
import { Beard } from '../../../../items/infra/typeorm/entities/Beard';
import { Eye } from '../../../../items/infra/typeorm/entities/Eye';
import { Lip } from '../../../../items/infra/typeorm/entities/Lip';
import { Item } from '../../../../items/infra/typeorm/entities/Item';
import { TipSex } from '../../../../items/infra/typeorm/entities/TipSex';

@Entity('tbPlayer')
export class Player {
  @PrimaryColumn({ type: 'varchar', length: 8 })
  matricula: string;

  @OneToOne(() => Body, idBodyPlayer => idBodyPlayer.nomeArquivo)
  @JoinColumn({
    referencedColumnName: 'nomeArquivo',
    name: 'idBodyPlayer',
  })
  @Column({ type: 'varchar', length: 100 })
  idBodyPlayer: string;

  @OneToOne(() => Hair, idHairPlayer => idHairPlayer.nomeArquivo)
  @JoinColumn({
    referencedColumnName: 'nomeArquivo',
    name: 'idHairPlayer',
  })
  // @Column({ type: 'varchar', length: 100 })
  idHairPlayer: string;

  @OneToOne(() => Beard, idBeardPlayer => idBeardPlayer.nomeArquivo)
  @JoinColumn({
    referencedColumnName: 'nomeArquivo',
    name: 'idBeardPlayer',
  })
  // @Column({ type: 'varchar', length: 100 })
  idBeardPlayer: string;

  @OneToOne(() => Eye, idEyePlayer => idEyePlayer.nomeArquivo)
  @JoinColumn({
    referencedColumnName: 'nomeArquivo',
    name: 'idEyePlayer',
  })
  // @Column({ type: 'varchar', length: 100 })
  idEyePlayer: string;

  @OneToOne(() => Lip, idLipPlayer => idLipPlayer.nomeArquivo)
  @JoinColumn({
    referencedColumnName: 'nomeArquivo',
    name: 'idLipPlayer',
  })
  // @Column({ type: 'varchar', length: 100 })
  idLipPlayer: string;

  @OneToOne(() => Item, idFeet => idFeet.id)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'idFeet',
  })
  // @Column({ type: 'varchar', length: 36 })
  idFeet: string;

  @OneToOne(() => Item, idUpperBody => idUpperBody.id)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'idUpperBody',
  })
  // @Column({ type: 'varchar', length: 36 })
  idUpperBody: string;

  @OneToOne(() => Item, idLowerBody => idLowerBody.id)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'idLowerBody',
  })
  // @Column({ type: 'varchar', length: 36 })
  idLowerBody: string;

  @OneToOne(() => TipSex, idTipSex => idTipSex.id)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'idTipSex',
  })
  idTipSex: number;

  @Column({ type: 'double', precision: 20, scale: 2 })
  wallet: number;

  @CreateDateColumn({ type: 'timestamp', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'NOW()' })
  updatedAt: Date;
}
