import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tipSubItem')
export class TipSubItem {
  @PrimaryColumn({ type: 'int', width: 2 })
  id: number;

  @Column({ type: 'varchar', length: 45 })
  tipoSubItem: string;
}
