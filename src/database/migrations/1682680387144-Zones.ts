import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Zones1682680387144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    await queryRunner.createTable(
      new Table({
        name: 'zones',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'area',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            enum: ['distribution', 'delivery'],
            isNullable: false,
          },
          {
            name: 'polygon',
            type: 'geometry',
            isNullable: false,
          },
          {
            name: 'organisationId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'organisationId',
            columnNames: ['organisationId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'organisations',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE zones;');
    await queryRunner.query('DROP EXTENSION IF EXISTS postgis;');
  }
}
