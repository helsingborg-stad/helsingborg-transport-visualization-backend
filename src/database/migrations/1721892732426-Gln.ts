import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Gln1721892732426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'zones',
            new TableColumn({
                name: 'gln',
                type: 'varchar',
                isNullable: true,
                default: null,
                isUnique: true,
            })
        );

        await queryRunner.query(`
            UPDATE zones
            SET gln = id
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('zones', 'gln');
    }

}
