import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTipSex1635527103402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tipSex',
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
            name: 'tipoSexo',
            type: 'varchar',
            isNullable: false,
            length: '45',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tipSex');
  }
}
