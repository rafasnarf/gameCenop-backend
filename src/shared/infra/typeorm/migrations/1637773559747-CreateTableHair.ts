import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableHair1637772556941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbHair',
        columns: [
          {
            name: 'nomeArquivo',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
            length: '100',
            isUnique: true,
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'idTipSex',
            type: 'int',
            width: 2,
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
      'tbHair',
      new TableForeignKey({
        columnNames: ['idTipSex'],
        referencedTableName: 'tipSex',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbHair');
  }
}
