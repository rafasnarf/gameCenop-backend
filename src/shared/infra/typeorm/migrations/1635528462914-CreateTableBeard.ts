import { MigrationInterface, QueryResult, QueryRunner, Table } from 'typeorm';

export class CreateTableBeard1635528462914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbBeard',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbBeard');
  }
}
