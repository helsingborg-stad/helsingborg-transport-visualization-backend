import { IEvent, IZone } from '@root/entities';
import { IMaps, Maps } from '@root/services/maps';
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EventDistance1733747425808 implements MigrationInterface {

    private mapsService: IMaps = new Maps();

    public async up(queryRunner: QueryRunner): Promise<void> {

        interface IEventWithZone extends IEvent {
            lat: number;
            lng: number;
        };

        await queryRunner.addColumn('events', new TableColumn({
            name: 'distance',
            type: 'float',
            isNullable: false,
            default: 0,
        }));

        //fetch all events and join with zones, add column to zones for center point
        const zones: IZone[] = await queryRunner.query(`
            SELECT * FROM zones
            
        `);
        for (const zone of zones) {
            if (!zone.lat || !zone.lng) {
            const centerPoint = await queryRunner.query(`
                SELECT ST_AsText(ST_Centroid(ST_Collect(polygon))) as center
                FROM zones
                WHERE id = $1
            `, [zone.id]);

            const [lng, lat] = centerPoint[0].center.replace('POINT(', '').replace(')', '').split(' ');

            await queryRunner.query(`
                UPDATE zones
                SET lat = $1, lng = $2
                WHERE id = $3
            `, [lat, lng, zone.id]);
            }
        }

        const events: IEventWithZone[] = await queryRunner.query(`
            SELECT events.*, zones.lat, zones.lng 
            FROM events 
            JOIN zones ON events."zoneId" = zones.id
        `);
        
        //group all events per sessionId
        const groupedEvents: { [key: string]: IEventWithZone[] } = {};
        for (const event of events) {
            if (!groupedEvents[event.sessionId]) {
                groupedEvents[event.sessionId] = [];
            }
            groupedEvents[event.sessionId].push(event);
        }

        //calculate distance between each event in a session
        for (const sessionId in groupedEvents) {
            const session = groupedEvents[sessionId];
            for (let i = 0; i < session.length - 1; i++) {
                const event1 = session[i];
                const event2 = session[i + 1];
                const distance = await this.mapsService.getDistance(`${event1.lat},${event1.lng}`,`${event2.lat},${event2.lng}`);
                await queryRunner.query(`
                    UPDATE events
                    SET distance = $1
                    WHERE id = $2
                `, [distance, event1.id]);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('events', 'distance');
    }

}
