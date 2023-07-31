import { MigrationInterface, QueryRunner } from "typeorm"

export class ZonesUniqueConstraintPolygon1690800507918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE zones ADD CONSTRAINT polygon_unique UNIQUE (polygon)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE zones DROP CONSTRAINT polygon_unique');
    }

}
