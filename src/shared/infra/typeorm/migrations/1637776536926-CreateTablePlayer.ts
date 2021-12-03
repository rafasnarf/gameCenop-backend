import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablePlayer1637776536926 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbPlayer',
        columns: [
          {
            name: 'matricula',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'idBodyPlayer',
            type: 'varchar',
            width: 100,
            isNullable: false,
          },
          {
            name: 'idHairPlayer',
            type: 'varchar',
            width: 100,
            isNullable: false,
          },
          {
            name: 'idBeardPlayer',
            type: 'varchar',
            width: 100,
            isNullable: true,
          },
          {
            name: 'idEyePlayer',
            type: 'varchar',
            width: 100,
            isNullable: false,
          },
          {
            name: 'idLipPlayer',
            type: 'varchar',
            width: 100,
            isNullable: false,
          },
          {
            name: 'idFeet',
            type: 'varchar',
            width: 36,
            isNullable: true,
          },
          {
            name: 'idUpperBody',
            type: 'varchar',
            width: 36,
            isNullable: true,
          },
          {
            name: 'idLowerBody',
            type: 'varchar',
            width: 36,
            isNullable: true,
          },
          {
            name: 'idTipSex',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'wallet',
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
      'tbPlayer',
      new TableForeignKey({
        columnNames: ['idBodyPlayer'],
        referencedTableName: 'tbBody',
        referencedColumnNames: ['nomeArquivo'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbPlayer',
      new TableForeignKey({
        columnNames: ['idHairPlayer'],
        referencedTableName: 'tbHair',
        referencedColumnNames: ['nomeArquivo'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbPlayer',
      new TableForeignKey({
        columnNames: ['idBeardPlayer'],
        referencedTableName: 'tbBeard',
        referencedColumnNames: ['nomeArquivo'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbPlayer',
      new TableForeignKey({
        columnNames: ['idEyePlayer'],
        referencedTableName: 'tbEye',
        referencedColumnNames: ['nomeArquivo'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbPlayer',
      new TableForeignKey({
        columnNames: ['idLipPlayer'],
        referencedTableName: 'tbLip',
        referencedColumnNames: ['nomeArquivo'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbPlayer',
      new TableForeignKey({
        columnNames: ['idFeet'],
        referencedTableName: 'tbItem',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbPlayer',
      new TableForeignKey({
        columnNames: ['idUpperBody'],
        referencedTableName: 'tbItem',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbPlayer',
      new TableForeignKey({
        columnNames: ['idLowerBody'],
        referencedTableName: 'tbItem',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'tbPlayer',
      new TableForeignKey({
        columnNames: ['idTipSex'],
        referencedTableName: 'tipSex',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbPlayer');
  }
}
