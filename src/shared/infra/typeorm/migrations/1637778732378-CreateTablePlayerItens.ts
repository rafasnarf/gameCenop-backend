import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablePlayerItens1637778732378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbPlayerItens',
        columns: [
          {
            name: 'idPlayer',
            isNullable: false,
            type: 'varchar',
            length: '8',
            isPrimary: true,
          },
          {
            name: 'idItem',
            isNullable: false,
            type: 'varchar',
            length: '36',
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
      'tbPlayerItens',
      new TableForeignKey({
        columnNames: ['idPlayer'],
        referencedTableName: 'tbPlayer',
        referencedColumnNames: ['matricula'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbPlayerItens',
      new TableForeignKey({
        columnNames: ['idItem'],
        referencedTableName: 'tbItem',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbPlayerItens');
  }
}
