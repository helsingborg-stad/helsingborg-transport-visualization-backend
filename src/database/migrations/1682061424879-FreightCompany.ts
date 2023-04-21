/* eslint-disable class-methods-use-this */
import { MigrationInterface, TableForeignKey, TableColumn, QueryRunner, Table } from 'typeorm';

export class FreightCompany1682061424879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'freight_companies',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
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
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'freightCompanyId',
        type: 'integer',
        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'freightCompanyId',
        columnNames: ['freightCompanyId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'freight_companies',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('freight_companies');
    await queryRunner.dropForeignKey('users', 'freightCompanyId');
  }
}
