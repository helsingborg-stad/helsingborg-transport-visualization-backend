import request from 'supertest';
import app from '@root/app';

describe('template', () => {
    describe('/api-docs', () => {
        it('should login the user', async () => {
            const appInstance = await app();

            return request(appInstance)
                .get('/api-docs')
                .expect(200);
        });
    });
});
