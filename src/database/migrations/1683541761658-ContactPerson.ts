import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ContactPerson1683541761658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'organisations',
      new TableColumn({
        name: 'contactPerson',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'organisations',
      new TableColumn({
        name: 'mobileNumber',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('organisations', 'contactPerson');
    await queryRunner.dropColumn('organisations', 'mobileNumber');
  }
}
