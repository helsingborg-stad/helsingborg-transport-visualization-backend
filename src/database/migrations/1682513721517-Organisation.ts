import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Organisation1682513721517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //create a extension for uuid generation
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.createTable(
      new Table({
        name: 'organisations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'orgNumber',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'pinCode',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'forgotPasswordToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'forgotPasswordTokenExpiration',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true
    );
    await queryRunner.createIndex(
      'organisations',
      new TableIndex({
        name: 'UX_organisation_email',
        columnNames: ['email'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('organisations', 'UX_organisation_email');
    await queryRunner.dropTable('organisations');
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
}
