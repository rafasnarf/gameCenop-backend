import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tipItem')
export class TipItem {
  @PrimaryColumn({ type: 'int', width: 2 })
  id: number;

  @Column({ type: 'varchar', length: 45 })
  tipoItem: string;
}
