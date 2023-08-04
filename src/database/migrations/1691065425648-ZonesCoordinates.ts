import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ZonesCoordinates1691065425648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'zones',
      new TableColumn({
        name: 'lat',
        type: 'float',
        isNullable: true,
        default: null,
      })
    );

    await queryRunner.addColumn(
      'zones',
      new TableColumn({
        name: 'lng',
        type: 'float',
        isNullable: true,
        default: null,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('zones', 'lat');
    await queryRunner.dropColumn('zones', 'lng');
  }
}
