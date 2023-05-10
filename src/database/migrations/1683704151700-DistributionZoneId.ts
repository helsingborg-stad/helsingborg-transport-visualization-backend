import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class DistributionZoneId1683704151700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'events',
      new TableColumn({
        name: 'distributionZoneId',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'events',
      new TableForeignKey({
        name: 'distributionZoneId',
        columnNames: ['distributionZoneId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'zones',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('events', 'distributionZoneId');
    await queryRunner.dropColumn('events', 'distributionZoneId');
  }
}
