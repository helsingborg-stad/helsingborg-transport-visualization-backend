import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Geolocation1682422791831 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'geolocations',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'integer',
          },
          {
            name: 'latitude',
            type: 'double precision',
          },
          {
            name: 'longitude',
            type: 'double precision',
          },
          {
            name: 'heading',
            type: 'double precision',
          },
          {
            name: 'registeredAt',
            type: 'timestamp',
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

        foreignKeys: [
          {
            name: 'userId',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('geolocations');
  }
}
