import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CascadeNullDistributionZoneId1687178790480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.dropForeignKey('events', 'distributionZoneId');
      await queryRunner.createForeignKey(
        'events',
        new TableForeignKey({
          name: 'distributionZoneId',
          columnNames: ['distributionZoneId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'zones',
          onDelete: 'SET NULL',
        })
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.dropForeignKey('events', 'distributionZoneId');
      await queryRunner.createForeignKey(
        'events',
        new TableForeignKey({
          name: 'distributionZoneId',
          columnNames: ['distributionZoneId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'zones',
        })
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
  }
}
