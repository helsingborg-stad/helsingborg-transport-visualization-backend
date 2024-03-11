import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class SessionIds1710145048708 implements MigrationInterface {

    //rename trackingId -> deviceId
    //add column sessionId (same as trackingId)
    //add os column

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" RENAME COLUMN "trackingId" TO "sessionId"`);
        await queryRunner.addColumn(
            'events',
            new TableColumn({
                name: 'deviceId',
                type: 'varchar',
                isNullable: true,
                default: null
            })
        );
        await queryRunner.addColumn(
            'events',
            new TableColumn({
                name: 'os',
                type: 'varchar',
                isNullable: true,
                default: null
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" RENAME COLUMN "sessionId" TO "trackingId"`);
        await queryRunner.dropColumn('events', 'deviceId');
        await queryRunner.dropColumn('events', 'os');
    }

}
