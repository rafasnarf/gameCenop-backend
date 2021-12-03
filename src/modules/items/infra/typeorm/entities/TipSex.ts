import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tipSex')
export class TipSex {
  @PrimaryColumn({ type: 'int', width: 2 })
  id: number;

  @Column({ type: 'varchar', length: 45 })
  tipoSexo: string;
}
