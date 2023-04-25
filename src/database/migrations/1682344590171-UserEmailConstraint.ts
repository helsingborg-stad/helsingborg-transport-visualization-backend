import { MigrationInterface, QueryRunner, TableIndex } from "typeorm"

export class UserEmailConstraint1682344590171 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createUniqueConstraint('users', new TableIndex({
        name: 'UQ_users_email',
        columnNames: ['email'],
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropIndex('users', 'UQ_users_email');
    }

}
