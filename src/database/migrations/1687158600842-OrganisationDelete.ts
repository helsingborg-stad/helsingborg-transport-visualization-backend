import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class OrganisationDelete1687158600842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.dropForeignKey('zones', 'organisationId');
      await queryRunner.createForeignKey(
        'zones',
        new TableForeignKey({
          name: 'organisationId',
          columnNames: ['organisationId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'organisations',
          onDelete: 'CASCADE',
        })
      );

      await queryRunner.dropForeignKey('events', 'zoneId');
      await queryRunner.createForeignKey(
        'events',

        new TableForeignKey({
          name: 'zoneId',
          columnNames: ['zoneId'],
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
      await queryRunner.dropForeignKey('zones', 'organisationId');
      await queryRunner.createForeignKey(
        'zones',
        new TableForeignKey({
          name: 'organisationId',
          columnNames: ['organisationId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'organisations',
        })
      );
      await queryRunner.dropForeignKey('events', 'zoneId');
      await queryRunner.createForeignKey(
        'events',
        new TableForeignKey({
          name: 'zoneId',
          columnNames: ['zoneId'],
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
