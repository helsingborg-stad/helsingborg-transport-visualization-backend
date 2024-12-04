import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class PrivatePublicAccount1733301934106 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('organisations', new TableColumn({
            name: 'isPublic',
            type: 'boolean',
            default: true,
            isNullable: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('organisations', 'isPublic');
    }

}
