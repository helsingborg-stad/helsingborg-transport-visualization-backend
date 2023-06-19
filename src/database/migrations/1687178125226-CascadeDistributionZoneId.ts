import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CascadeDistributionZoneId1687178125226 implements MigrationInterface {
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
          onDelete: 'CASCADE',
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
