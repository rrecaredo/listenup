import request from 'supertest';
import server from '../src/server';

describe('GET /users', () => {
    it('should return 200 OK with a collection of Users', async () => {
        const result = await request(server)
            .get('/users');

        expect(result.status).toBe(200);
        expect(result.body.length).toBeDefined();

        return result;
    });
  });
