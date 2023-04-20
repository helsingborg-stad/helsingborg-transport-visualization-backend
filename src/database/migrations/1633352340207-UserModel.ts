/* eslint-disable class-methods-use-this */
import {
  MigrationInterface, QueryRunner, Table, TableIndex,
} from 'typeorm';

export class UserModel1633352340207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'invitationConfirmed',
            type: 'bool',
            default: false,
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
            name: 'firstName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastName',
            type: 'varchar',
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
      true,
    );
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'user_email_index',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'user_email_index');
    await queryRunner.dropTable('users');
  }
}
