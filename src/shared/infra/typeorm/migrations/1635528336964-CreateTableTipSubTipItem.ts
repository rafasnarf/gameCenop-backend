import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTipSubTipItem1635528336964
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subTipItem',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            width: 2,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isUnique: true,
          },
          {
            name: 'tipoSubItem',
            type: 'varchar',
            isNullable: false,
            length: '45',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subTipItem');
  }
}
