import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Events1683114223287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'trackingId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'orgNumber',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'zoneType',
            type: 'varchar',
            enum: ['distribution', 'delivery'],
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'area',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'enteredAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'exitedAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',

            default: 'now()',
          },
          {
            name: 'zoneId',
            type: 'uuid',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'zoneId',
            columnNames: ['zoneId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'zones',
          },
        ],
      }),
      true
    );
    await queryRunner.createIndex(
      'events',
      new TableIndex({
        name: 'IDX_events_name_orgNumber_zoneType_address_area',
        columnNames: ['name', 'orgNumber', 'zoneType', 'address', 'area'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('events');
    await queryRunner.dropIndex('events', 'IDX_events_name_orgNumber_zoneType_address_area');
  }
}
