import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableItem1637774118476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbItem',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isNullable: false,
            length: '36',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
            length: '45',
          },
          {
            name: 'nomeArquivo',
            type: 'varchar',
            isNullable: false,
            length: '100',
          },
          {
            name: 'idTip',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'idSubTipo',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'idTipSex',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'valor',
            type: 'double',
            precision: 20,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 0,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tbItem',
      new TableForeignKey({
        columnNames: ['idTipSex'],
        referencedTableName: 'tipSex',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbItem',
      new TableForeignKey({
        columnNames: ['idTip'],
        referencedTableName: 'tipItem',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'tbItem',
      new TableForeignKey({
        columnNames: ['idSubTipo'],
        referencedTableName: 'subTipItem',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbItem');
  }
}
