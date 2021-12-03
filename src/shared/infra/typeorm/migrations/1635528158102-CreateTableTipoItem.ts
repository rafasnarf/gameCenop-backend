import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTipoItem1635528158102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tipItem',
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
            name: 'tipoItem',
            type: 'varchar',
            isNullable: false,
            length: '45',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tipItem');
  }
}
